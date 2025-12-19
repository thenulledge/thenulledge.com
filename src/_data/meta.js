export const url = process.env.URL || 'http://localhost:8080';
// Extract domain from `url`
export const domain = new URL(url).hostname;
export const name = 'nullEDGE';
export const siteName = 'theNullEDGE';
export const email = 'team@getaiinabox.com';
export const emailName = 'nullEDGE Team';
export const description = 'Join ServiceNow folks for deep technical sessions, real code, and clear lessons. 100% free virtual conference.';
export const siteType = 'Organization'; // schema
export const locale = 'en_EN';
export const lang = 'en';
export const skipContent = 'Skip to content';
export const social = {
  youtube: 'https://www.youtube.com/@thenulledge'
};
export const theme = {
  primary: '#10b981',
  background: '#ffffff',
  text: '#1f2937'
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
//export const themeColor = '#dd4462'; // used in manifest, for example primary color value
export const themeColor = '#efe154'; // used in manifest, for example primary color value
export const themeLight = '#f8f8f8'; // used for meta tag theme-color, if light colors are prefered. best use value set for light bg
export const themeDark = '#2e2e2e'; // used for meta tag theme-color, if dark colors are prefered. best use value set for dark bg
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default_alt = `nullEDGE - Free ServiceNow Conference. ${description}`; // alt text for default meta image
export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Main',
  ariaBottom: 'Complementary',
  ariaPlatforms: 'Platforms',
  drawerNav: false,
  subMenu: false
};