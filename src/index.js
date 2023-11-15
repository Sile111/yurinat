import {Control} from "./modules/control";
import {Create} from "./modules/create";
import {Render} from "./modules/render";
import {DbRequest} from "./modules/dbRequest";
import {RegExp} from "./modules/regExp";
import {Admin} from "./modules/admin";

window.control = new Control();
window.create = new Create();
window.render = new Render();
window.dbRequest = new DbRequest();
window.regExp = new RegExp();
window.admin = new Admin();


window.addEventListener('load', async () => {
    control.scrollControl();
    control.burgerControl();

    if (window.location.pathname === '/yurinat/news.html') {
        control.modalsControl();
        const newsArr = await dbRequest.getNews();
        await render.renderNewsCards(newsArr, 'news');
    }

    if (window.location.pathname === '/yurinat/index.html') {
        control.modalsControl();
        const newsArr = await dbRequest.getNews();
        await render.renderNewsCards(newsArr, 'logistic');
        control.brandsControl();
    }

    if (window.location.pathname === '/yurinat/news-item.html') {
        control.modalsControl();
        const newsArr = await dbRequest.getNews();
        await render.renderNewsPage(newsArr);
    }

    if (window.location.pathname === '/yurinat/calc.html') {
        control.modalsControl();

        control.tabsControl();
    }

    if (window.location.pathname === '/yurinat/admin.html') {
        admin.authControl();
    }
});
