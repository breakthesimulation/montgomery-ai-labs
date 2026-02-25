// JavaScript to fetch and display news
const newsFeed = document.getElementById('news-feed');

// Placeholder news data
const newsData = [
    { title: 'Solana Price Surges', content: 'Solana price reached a new all-time high today.' },
    { title: 'New Solana dApp Launched', content: 'A new decentralized application was launched on Solana.' }
];

function displayNews() {
    newsData.forEach(news => {
        const article = document.createElement('article');
        article.innerHTML = `<h3>${news.title}</h3><p>${news.content}</p>`;
        newsFeed.appendChild(article);
    });
}

displayNews();
