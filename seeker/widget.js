// Solana Seeker Widget
(function() {
  var container = document.getElementById('seeker-widget');
  if (!container) return;

  var API_KEY = '3d79d057a66e65a870a114ac10cd895c';
  var origin = window.location.origin;
  var API_URL = origin + '/api/seeker/feed?key=' + API_KEY + '&per_page=5';

  function timeAgo(ts) {
    var s = Math.floor((Date.now() - new Date(ts)) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s/60) + 'm ago';
    if (s < 86400) return Math.floor(s/3600) + 'h ago';
    return Math.floor(s/86400) + 'd ago';
  }

  function render(articles) {
    var html = '<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:400px;background:#1C1C1E;border-radius:12px;overflow:hidden;">';
    html += '<div style="background:linear-gradient(90deg,#0A84FF,#5E5CE6);padding:12px 16px;">';
    html += '<span style="color:white;font-weight:700;font-size:14px;">🔥 Solana Seeker</span></div>';
    html += '<div style="padding:8px;">';
    
    articles.forEach(function(a) {
      html += '<a href="' + origin + '/seeker/article.html?id=' + a.id + '" target="_blank" style="display:block;padding:10px;text-decoration:none;color:inherit;border-bottom:1px solid #2C2C2E;">';
      html += '<div style="font-size:13px;font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:#fff;">' + a.title + '</div>';
      html += '<div style="font-size:11px;color:#8E8E93;margin-top:4px;">' + a.source + ' · ' + timeAgo(a.published) + '</div>';
      html += '</a>';
    });
    
    html += '</div>';
    html += '<div style="padding:8px 12px;background:#0A0A0F;text-align:center;">';
    html += '<a href="' + origin + '/seeker/index.html" target="_blank" style="font-size:11px;color:#8E8E93;text-decoration:none;">Powered by Solana Seeker</a>';
    html += '</div></div>';
    
    container.innerHTML = html;
  }

  fetch(API_URL)
    .then(function(r) { return r.json(); })
    .then(function(d) { render(d.articles || []); })
    .catch(function(e) { container.innerHTML = '<p style="color:#8E8E93;padding:12px;">Unable to load</p>'; });
})();
