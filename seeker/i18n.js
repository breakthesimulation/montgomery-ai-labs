// Solana Seeker i18n Framework
// Add language support with minimal overhead

const DEFAULT_LANG = 'en';

const translations = {
  en: {
    // Navigation
    'nav.feed': 'Feed',
    'nav.digest': 'Digest',
    'nav.projects': 'Projects',
    'nav.watching': 'Watching',
    'nav.saved': 'Saved',
    'nav.settings': 'Settings',
    
    // Feed
    'feed.justIn': 'Just In',
    'feed.all': 'All',
    'feed.trending': 'Trending',
    'feed.noArticles': 'No articles found',
    'feed.refresh': 'Refresh',
    'feed.newStories': 'new stories',
    
    // Digest
    'digest.morning': 'Morning UTC',
    'digest.ny': 'New York',
    'digest.tokyo': 'Tokyo',
    'digest.readMore': 'Read full digest →',
    
    // Settings
    'settings.notifications': 'Notifications',
    'settings.topics': 'Topics',
    'settings.about': 'About',
    'settings.version': 'Version',
    'settings.clearSaved': 'Clear Saved',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Failed to load',
    'common.retry': 'Retry',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.share': 'Share',
    'common.search': 'Search',
  },
  
  es: {},  // Spanish - stub for future
  pt: {},   // Portuguese - stub for future
};

function t(key) {
  const lang = localStorage.getItem('seeker_lang') || DEFAULT_LANG;
  return translations[lang]?.[key] || translations[DEFAULT_LANG][key] || key;
}

function setLang(lang) {
  localStorage.setItem('seeker_lang', lang);
  // Re-render would happen here
}

function getLang() {
  return localStorage.getItem('seeker_lang') || DEFAULT_LANG;
}

// Auto-detect from browser
if (!localStorage.getItem('seeker_lang')) {
  const browserLang = navigator.language?.split('-')[0];
  if (translations[browserLang]) {
    localStorage.setItem('seeker_lang', browserLang);
  }
}
