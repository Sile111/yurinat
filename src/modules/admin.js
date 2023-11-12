export class Admin {
    level = 2;

    authControl = async () => {
        const form = document.querySelector('.auth-modal__form');
        const submit = document.querySelector('.auth-modal__send');

        submit.addEventListener('click', async e => {
            e.preventDefault();
            console.log('aa');

            const formData = new FormData(form);
            const admins = await dbRequest.getAdmins();

            await admins.forEach(e => {
                if (e.login === formData.get('login') && e.password === formData.get('password')) {
                    this.level = +e.level;
                    form.remove();
                    document.body.append(create.createAdminPage());

                    const main = document.querySelector('.admin-main');
                    main.append(create.createKanban());
                    main.append(create.createPriceSet());
                    main.append(create.createNewsAdmin());

                    if (this.level === 0) {
                        main.append(create.createAdmins());
                    }
                    this.workFlow();
                }
            })
        });
    }


    getAllRequests = async () => {
        const partners = await dbRequest.getRequests('partner');
        const requests = await dbRequest.getRequests('request');
        const transes = await dbRequest.getRequests('trans');
        const allRequests = [];
        let id = 0;

        await requests.forEach(e => {
            allRequests.push(e);
        })
        await transes.forEach(e => {
            allRequests.push(e);
        })
        await partners.forEach(e => {
            allRequests.push(e);
        })

        await allRequests.forEach(e => {
            e.panelId = id;
            id++;
        })

        return allRequests
    }

    chooseArray = async (full = 'yes', change = 'no', arr = 'no') => {
        let chosenArray;
        if (full === 'yes' && change === 'no') {
            return await this.getAllRequests()
        }
        if (change === 'yes') {
            chosenArray = arr;
            return chosenArray
        }
    }

    chooseArrayNews = async (full = 'yes', change = 'no', arr = 'no') => {
        let chosenArray;
        if (full === 'yes' && change === 'no') {
            return await dbRequest.getNews();
        }
        if (change === 'yes') {
            chosenArray = arr;
            return chosenArray
        }
    }

    renderCards = async (full = 'yes', change = 'no', arr = 'no') => {
        // const columnOne = document.querySelector('.one');
        // const columnTwo = document.querySelector('.two');
        // const columnThree = document.querySelector('.three');
        // const columnFour = document.querySelector('.four');
        const requests = await this.chooseArray(full, change, arr);
        const columns = document.querySelectorAll('.kanban__column-content');
        columns.forEach(e => {
            e.replaceChildren();
        })
        await requests.forEach(e => {
            document.querySelector(`.${e.column}`).append(create.createKanbanCard(e));
        });

        control.cardDeleteControl();
        control.cardEditControl();
        control.dragControl();
    }

    renderAdmins = async () => {
        const admins = await dbRequest.getAdmins();
        const container = document.getElementById('admins');

        container.replaceChildren();

        await admins.forEach(e => {
            container.append(create.createStripAdmin(e.name, `Логин: ${e.login}`, `Пароль: ${e.password}`, e.level, e.id))
        })

        // control.editAdminControl();
        // control.deleteAdminControl();
    }

    renderNews = async (full = 'yes', change = 'no', arr = 'no') => {
        const news = await this.chooseArrayNews(full, change, arr);
        const newsContainer = document.querySelector('.news-admin');

        newsContainer.replaceChildren();

        await news.forEach(e => {
            newsContainer.append(create.createAdminNewsCard(e.id, e.img, e.title, e.text));
        });

        // control.deleteNewsControl();
        // control.editNewsControl();
    }

    workFlow = async () => {
        await this.renderCards();

        if (this.level === 0) {
            await this.renderAdmins();
        }
        await this.renderNews();
        control.dragControl();
        control.columnControl();
        control.searchControl();
        control.priceControl();
        control.addNewsControl();
        if (this.level === 0) {
            control.addAdminControl();
            control.editAdminControl();
            control.deleteAdminControl();
        }
        control.deleteNewsControl();
        control.editNewsControl();
        control.searchControlNews();
    }


}