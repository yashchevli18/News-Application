const API_KEY = "c941b75e8a864b8f8f1fbe5d08be7451";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    fetchNews("india")
});

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(articles => {
        if (!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles)
        cardsContainer.appendChild(cardClone)
    });
}

function fillDataInCard(cardClone, articles) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${articles.source.name} ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(articles.url, "_blank")
    })
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})