import fs from 'fs/promises';
import path from 'path';
import sponsorItems from './sponsor-items.js';

/**
 * Merge canonical sponsor-items.js with fetched storefront product JSON.
 * @returns {Promise<Array<Object>>}
 */
export default async function () {
  const root = process.cwd();
  const productFile = path.join(root, 'src', '_data', 'fourthwall-products.json');

  const sponsorsList = sponsorItems || [];

  let products = {};
  try {
    const raw = await fs.readFile(productFile, 'utf8');
    products = JSON.parse(raw);
  } catch (e) {
    products = {};
  }

  const merged = (sponsorsList || []).map(item => {
    const slug = item.slug;
    // Allow explicit mapping to storefront product slug
    const productSlug = item.productSlug || slug;
    const product = products[productSlug] || null;

    const primaryVariant = product && Array.isArray(product.variants) && product.variants[0]
      ? product.variants[0]
      : null;

    const price = primaryVariant && primaryVariant.unitPrice
      ? { value: primaryVariant.unitPrice.value, currency: primaryVariant.unitPrice.currency }
      : null;

    const image = (product && Array.isArray(product.images) && product.images[0])
      ? product.images[0].transformedUrl || product.images[0].url
      : null;

    const shopUrl = product ? `https://storefront.fourthwall.com/products/${productSlug}` : null;

    // Prefer local (site) copy for label/description/benefits when present
    const description = item.description || (product && product.description) || null;
    const benefits = item.benefits || null;

    return {
      slug,
      productSlug,
      label: item.label || (product && product.name) || slug,
      order: item.order || 999,
      product,
      price,
      image,
      shopUrl,
      state: product ? product.state : null,
      description,
      benefits,
      bestValue: item.bestValue || false,
      emailSubject: item['email-subject'] || null,
      emailBody: item['email-body'] || null
    };
  });

  merged.sort((a, b) => (a.order === b.order ? (a.label || '').localeCompare(b.label) : a.order - b.order));
  return merged;
}
