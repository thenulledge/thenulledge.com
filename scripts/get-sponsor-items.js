#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const FOURTHWALL_STOREFRONT_TOKEN = process.env.FOURTHWALL_STOREFRONT_TOKEN;
if (!FOURTHWALL_STOREFRONT_TOKEN) {
  console.error('Missing FOURTHWALL_STOREFRONT_TOKEN in .env. Add FOURTHWALL_STOREFRONT_TOKEN="ptkn_xxx"');
  process.exit(1);
}

const OUT_PATH = path.join(process.cwd(), 'src', '_data', 'fourthwall-products.json');
const SLUG_FILE = path.join(process.cwd(), 'scripts', 'sponsor-slugs.json');
const CACHE_FILE = path.join(process.cwd(), '.fourthwall-cache.json');

const DEFAULT_TTL = Number(process.env.FOURTHWALL_CACHE_TTL_SECONDS || 3600);

function parseArgs() {
  const raw = process.argv.slice(2);
  const args = { slugs: [], force: false, ttl: DEFAULT_TTL, failOnFetch: undefined };
  for (const token of raw) {
    if (token === '--force') { args.force = true; continue }
    if (token.startsWith('--ttl=')) { const v = Number(token.split('=')[1]); if (!Number.isNaN(v) && v>0) args.ttl = v; continue }
    if (token === '--no-fail') { args.failOnFetch = false; continue }
    if (token === '--fail') { args.failOnFetch = true; continue }
    if (token.startsWith('--')) continue;
    args.slugs.push(token);
  }
  return args;
}

async function readSlugsFromFile() {
  try {
    const raw = await fs.readFile(SLUG_FILE, 'utf8');
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.length) return arr.map(String);
  } catch (e) {}
  return [];
}

async function readCache() {
  try { const raw = await fs.readFile(CACHE_FILE, 'utf8'); return JSON.parse(raw) } catch (e) { return { products: {} } }
}

async function writeCache(cache) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

async function fetchProduct(slug) {
  const url = `https://storefront-api.fourthwall.com/v1/products/${encodeURIComponent(slug)}?storefront_token=${encodeURIComponent(FOURTHWALL_STOREFRONT_TOKEN)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const body = await res.text().catch(()=>'');
    throw new Error(`${res.status} ${res.statusText} ${body.slice(0,300)}`);
  }
  return res.json();
}

async function main() {
  const { slugs: cliSlugs, force, ttl } = parseArgs();
  let slugs = cliSlugs && cliSlugs.length ? cliSlugs : await readSlugsFromFile();
  // If there's a canonical sponsor-items.js, use that as default source for slugs
  if ((!slugs || !slugs.length)) {
    try {
      const sponsorItemsModule = await import(path.join(process.cwd(), 'src', '_data', 'sponsor-items.js'));
      const sponsorItems = sponsorItemsModule.default;
      if (Array.isArray(sponsorItems) && sponsorItems.length) {
        slugs = sponsorItems.map(item => item.slug).filter(Boolean);
      }
    } catch (e) {
      // ignore
    }
  }
  if (!slugs || !slugs.length) {
    console.error('No slugs provided. Pass slugs as args or create scripts/sponsor-slugs.json');
    process.exit(1);
  }

  const cache = await readCache();
  const results = {};
  const now = Date.now();
  let failuresWithoutCache = 0;
  // Determine fail behavior: CLI flag takes precedence, then env var, default true
  const envFail = process.env.FOURTHWALL_FAIL_ON_FETCH;

  for (const slug of slugs) {
    const cached = cache.products && cache.products[slug];
    const valid = cached && (now - (cached.fetchedAt || 0) < ttl * 1000) && !force;
    if (valid) { results[slug] = cached.data; console.log(`${slug}: using cached data`); continue }

    try {
      console.log(`Fetching ${slug}...`);
      const data = await fetchProduct(slug);
      results[slug] = data;
      cache.products = cache.products || {};
      cache.products[slug] = { fetchedAt: Date.now(), data };
      console.log(`Fetched ${slug}`);
    } catch (err) {
      console.error(`Error fetching ${slug}:`, err.message);
      if (cached && cached.data) {
        console.log(`${slug}: falling back to stale cached data`);
        results[slug] = cached.data
      } else {
        console.error(`${slug}: no cache available`);
        failuresWithoutCache++;
        results[slug] = { error: err.message };
      }
    }
    await new Promise(r => setTimeout(r, 200));
  }
  cache.products = cache.products || {};
  cache.updatedAt = Date.now();
  cache.ttl = ttl;

  // Resolve fail-on-fetch setting: CLI flag from initial parse -> env var -> default true
  const parsedArgs = parseArgs();
  const cliFailFlag = parsedArgs.failOnFetch;
  const finalFailOnFetch = (typeof cliFailFlag === 'boolean') ? cliFailFlag
    : (envFail === undefined ? true : !(envFail === 'false' || envFail === '0'));

  if (failuresWithoutCache > 0 && finalFailOnFetch) {
    console.error(`Aborting: ${failuresWithoutCache} product(s) failed to fetch and no cache exists. Set FOURTHWALL_FAIL_ON_FETCH=false or run with --no-fail to override.`);
    // Do not write partial results when failing — exit non-zero so CI/build fails
    process.exit(2);
  }

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  try { await writeCache(cache) } catch (e) { console.warn('Could not write cache file:', e.message) }
  console.log('Wrote results to', OUT_PATH);
}

main().catch(err => { console.error('get-sponsor-items failed:', err); process.exit(1) });
