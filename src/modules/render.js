export class Render {
    renderNewsCards = async (news, insertClass) => {
        const insert = insertClass === 'logistic' ? document.querySelector('.logistic__news')
            : document.querySelector('.news__container');

        insertClass === 'logistic' ? news = news.slice(-3) : news;

        news.forEach(e => {
            const card = create.createNewsCard(e.id, e.image, e.title, e.text, e.date, insertClass);
            insert.append(card);
        });
    }

    renderNewsPage = async (news) => {
        let index = window.location.href.slice(window.location.href.indexOf('=') + 1);

        let newsItem = news.find(newsItem => newsItem.id === +index);

        const img = document.querySelector('.new__img');
        const title = document.querySelector('.new__title');
        const text = document.querySelector('.new__text');

        img.src = `img/images/${newsItem.image === 'news-img.png' ? newsItem.image : 'news-img-replace.png'}`;
        title.innerText = newsItem.title;
        text.innerText = newsItem.text;
    }
    // renderMain = async (news) => {
    //     const newsContainer = document.querySelector('.logistic__news');
    //     await this.renderNewsCards(newsContainer, news.slice(-3), 'logistic');
    // }
    //
    // renderNews = async (news) => {
    //     const newsContainer = document.querySelector('.news__container');
    //     await this.renderNewsCards(newsContainer, news, 'news');
    // }
}
