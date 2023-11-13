export class Control {
    modalsControl = (insert = '.container') => {
        const partnerBtn = document.querySelectorAll('.partner-btn');
        const container = document.querySelector(`${insert}`);

        partnerBtn.forEach(e => {
            e.addEventListener('click', () => {
                const modal = create.createPartnerModal();
                container.append(modal);
                this.partnerModalControl();

                const close = document.querySelector('.partner-modal__cross');
                const form = document.querySelector('.partner-modal__form');

                document.body.style.overflow = 'hidden';

                close.addEventListener('click', () => {
                    form.reset();
                    modal.remove();
                    document.body.style.overflow = 'visible';
                })
            })
        });
    }

    getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '.' + mm + '.' + yyyy;

        return formattedToday;
    }

    partnerModalControl = () => {
        const overlay = document.querySelector('.overlay');
        const form = document.querySelector('.partner-modal__form');
        const close = document.querySelector('.partner-modal__cross');
        const submit = document.querySelector('.partner-modal__send');
        const container = document.querySelector('.container');

        close.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            overlay.remove();
        });

        submit.addEventListener('click', e => {
            e.preventDefault();

            const formData = new FormData(form);

            if (formData.get('inn').trim() === '' || formData.get('email').trim() === '' || formData.get('phone').trim() === '' ||
                formData.get('type').trim() === '' || formData.get('company').trim() === '' ) {
                container.append(create.createSuccess('no'));
                this.successControl();
            } else {
                const item = {
                    company: formData.get('company').trim(),
                    type: formData.get('type').trim(),
                    phone: formData.get('phone').trim(),
                    email: formData.get('email').trim(),
                    inn: formData.get('inn').trim(),
                    comment: formData.get('comment').trim(),
                    date: this.getCurrentDate(),
                    column: 'one',
                    service: 'partner',
                }

                dbRequest.addRequest(item, 'partner', container);

                form.reset();
                overlay.remove();
            }


            // container.append(create.createSuccess());
        });
    }

    scrollControl = () => {
        let upArr = document.createElement('div');
        upArr.classList.add('up');
        upArr.insertAdjacentHTML('beforeend', `
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                <circle cx="22.5" cy="22.5" r="22.5" fill="#4BB82F"/>
                <path d="M10.0001 26.5112C9.99925 26.191 10.0558 25.8746 10.1655 25.5853C10.2753 25.296 10.4355 25.0411 10.6343 24.8394L20.9191 14.4876C21.2258 14.1723 21.6105 14 22.0076 14C22.4046 14 22.7893 14.1723 23.096 14.4876L33.3808 25.2038C33.7308 25.5676 33.951 26.0903 33.9927 26.6571C34.0345 27.2238 33.8946 27.7881 33.6036 28.2257C33.3127 28.6634 32.8946 28.9387 32.4413 28.9909C31.988 29.0432 31.5367 28.8682 31.1867 28.5044L21.999 18.9241L12.8113 28.1829C12.5597 28.445 12.2533 28.6114 11.9284 28.6626C11.6035 28.7138 11.2736 28.6475 10.9779 28.4717C10.6822 28.2958 10.4329 28.0177 10.2596 27.6703C10.0863 27.3228 9.99629 26.9206 10.0001 26.5112Z" fill="white"/>
            </svg>
        `);

        document.body.append(upArr);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 700) {
                if (!upArr.classList.contains('visible')) {
                    upArr.classList.add('visible');
                }
            } else {
                if (upArr.classList.contains('visible')) {
                    upArr.classList.remove('visible');
                }
            }
        });

        upArr.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        })
    };

    tabsControl = () => {
        const leftTab = document.querySelector('.calc__tab_request');
        const rightTab = document.querySelector('.calc__tab_trans');
        const tabs = document.querySelector('.calc__tabs');
        const container = document.getElementById('calcContainer');

        let requestItemsArr = [];
        let itemId = 0;

        container.append(create.createRequestModal());
        this.controlCalcModals(requestItemsArr, itemId, 'request');

        leftTab.addEventListener('click', () => {
            if (!leftTab.classList.contains('selected')) {
                leftTab.classList.toggle('selected');
                rightTab.classList.toggle('selected');

                while (container.children.length > 1) {
                    container.removeChild(container.lastChild);
                }

                let requestItemsArr = [];

                container.append(create.createRequestModal());
                this.controlCalcModals(requestItemsArr, itemId, 'request');
            }
        });

        rightTab.addEventListener('click', () => {
            if (!rightTab.classList.contains('selected')) {
                leftTab.classList.toggle('selected');
                rightTab.classList.toggle('selected');

                while (container.children.length > 1) {
                    container.removeChild(container.lastChild);

                }

                let requestItemsArr = [];

                container.append(create.createTransModal());
                this.controlCalcModals(requestItemsArr, itemId, 'trans');
            }
        });
    }

    controlCalcModals = (requestItemsArr, itemId, service) => {
        const confirm = document.getElementById('confirm');
        const cancel = document.getElementById('cancel');
        const requestForm = document.getElementById('requestForm');
        const modal = document.getElementById('requestModal');
        const container = document.getElementById('calcContainer');
        const mainContainer = document.querySelector('.container');
        const modalService = service;


        const controlCalcRender = () => {
            while (container.children.length > 1) {
                container.removeChild(container.lastChild);
            }

            console.log(modalService);

            requestItemsArr.forEach(e => {
                if (modalService === 'request') {
                    container.append(create.createCalcStrip(e.type, e.amount, e.id));
                } else if (modalService === 'trans') {
                    container.append(create.createCalcStrip(e.size, `${e.weight} кг.`, e.id));
                }


            });
            this.controlStrip(requestItemsArr, itemId, modalService);
            modal.remove();

            container.append(create.createCalcButtons());
            this.controlCalcButtons(requestItemsArr, itemId, modalService);
        }

        confirm.addEventListener('click', e => {
            e.preventDefault();

            const formData = new FormData(requestForm);

            let requestItem = {

            }

            if (service === 'request') {
                if (formData.get('type') === null || formData.get('amount').trim() === '' ||
                    formData.get('index').trim() === '' || formData.get('comment').trim() === '' ||
                    formData.get('index').trim().length !== 6) {
                    mainContainer.append(create.createSuccess('no'));
                    this.successControl();
                } else {
                    requestItem = {
                        id: itemId++,
                        country: formData.get('country'),
                        type: formData.get('type'),
                        amount: formData.get('amount').trim(),
                        index: formData.get('index').trim(),
                        comment: formData.get('comment').trim(),
                        service: service,
                    }

                    requestItemsArr.push(requestItem);
                    console.log(requestItemsArr);

                    controlCalcRender();
                }
            } else if (service === 'trans') {
                if (formData.get('indexFrom').trim() === '' || formData.get('indexFrom').trim().length !== 6 ||
                    formData.get('indexTo').trim() === '' || formData.get('indexTo').trim().length !== 6 ||
                    formData.get('size').trim() === '' || formData.get('weight').trim() === '' ||
                    String(formData.get('indexFrom').trim()).substring(0, 3) !== '236' || String(formData.get('indexTo').trim()).substring(0, 3) !== '236') {

                        mainContainer.append(create.createSuccess('no'));
                        this.successControl();
                } else {
                    requestItem = {
                        id: itemId++,
                        indexFrom: formData.get('indexFrom').trim(),
                        indexTo: formData.get('indexTo').trim(),
                        size: formData.get('size').trim(),
                        weight: formData.get('weight').trim(),
                        service: service,
                    }

                    requestItemsArr.push(requestItem);
                    console.log(requestItemsArr);

                    controlCalcRender();
                }
            }

        });

        cancel.addEventListener('click', e => {
            e.preventDefault();

            requestForm.reset();
            modal.remove();

            controlCalcRender();
        });
    }

    controlCalcButtons = async (requestItemsArr, itemId, service, ifAdd = 'no') => {
        const add = document.getElementById('calcAddButton');
        const calc = document.getElementById('calcCalcButton')
        const container = document.getElementById('calcContainer');
        const mainContainer = document.querySelector('.container');
        const calcButtons = document.getElementById('calcFinalButtons');

        if (ifAdd !== 'no') {
            add.addEventListener('click', e => {
                e.preventDefault();

                if (service === 'request') {
                    container.append(create.createRequestModal());
                } else if (service === 'trans') {
                    container.append(create.createTransModal());
                }

                calcButtons.remove();
                this.controlCalcModals(requestItemsArr, itemId, service);
            });
        }

        calc.addEventListener('click', async e => {
            e.preventDefault();

            const moscowCoords = {
                "lat": 55.772502,
                "lon": 37.608949
            }

            const kaliningradCoords = {
                "lat": 54.70549,
                "lon": 20.552732
            }

            let coords;

            if (service === 'request') {
                if (String(requestItemsArr[0].index).substring(0, 3) === '236') {
                    coords = kaliningradCoords;
                } else {
                    coords = moscowCoords;
                }

                dbRequest.getCoords(requestItemsArr[0].index, coords, mainContainer, requestItemsArr, service, itemId);

            } else if (service === 'trans') {
                coords = kaliningradCoords;

                dbRequest.getCoords(requestItemsArr[0].indexTo, coords, mainContainer, requestItemsArr, service, itemId);
            }
        });
    }

    controlRequestFinal = (requestItemsArr, service, distance, itemId) => {
        const sliderContainer = document.querySelector('.final-request__slider');
        const leftArrow = document.querySelector('.final-request__arrow_left');
        const rightArrow = document.querySelector('.final-request__arrow_right');
        const cancelButton = document.querySelector('.final-request__cancel-button');
        const overlay = document.querySelector('.overlay');
        const phoneCall = document.querySelector('.final-request__call-button');
        const page = document.querySelector('.final-request__page');
        const container = document.querySelector('.container');

        const firstItem = requestItemsArr[0];
        let currentPage = 1;
        let maxPage = requestItemsArr.length;

        const insertSlide = (item) => {
            if (service === 'request') {
                sliderContainer.insertBefore(create.createFinalSlide(item.country, item.type,
                    item.amount, item.index, item.comment), rightArrow);
            } else if (service === 'trans') {
                sliderContainer.insertBefore(create.createFinaSlideTrans(item.indexFrom, item.indexTo, item.size,
                    item.weight), rightArrow);
            }

            page.textContent = `${currentPage}/${requestItemsArr.length}`
        }

        insertSlide(firstItem);

        cancelButton.addEventListener('click', e => {
            e.preventDefault();

            document.body.style.overflow = 'visible';

            overlay.remove();
        });

        rightArrow.addEventListener('click', e => {
            if (currentPage < maxPage) {
                currentPage++;
                sliderContainer.children[1].remove();

                insertSlide(requestItemsArr[currentPage - 1]);
                const slide = document.querySelector('.final-request__slide-container');

                slide.classList.add('blur');

                setTimeout(() => {
                    slide.classList.remove('blur');
                }, 250)
            }
        });

        leftArrow.addEventListener('click', e => {
            if (currentPage > 1) {
                currentPage--;
                sliderContainer.children[1].remove();

                insertSlide(requestItemsArr[currentPage - 1]);
                const slide = document.querySelector('.final-request__slide-container');

                slide.classList.add('blur');

                setTimeout(() => {
                    slide.classList.remove('blur');
                }, 250)
            }
        });

        phoneCall.addEventListener('click', e => {
            e.preventDefault();

            overlay.classList.add('invisible');

            container.append(create.createPhoneCall());
            this.controlPhoneCall(overlay, requestItemsArr, distance, service, itemId);
        })

    }

    controlPhoneCall = (outerOverlay, requestItemsArr, distance, service, itemId) => {
        const overlay = document.querySelectorAll('.overlay');
        const submit = document.querySelector('.phone-call__submit');
        const close = document.querySelector('.phone-call__close');
        const form = document.querySelector('.phone-call__form');
        const container = document.querySelector('.container');

        close.addEventListener('click', e => {
            e.preventDefault();

            outerOverlay.classList.remove('invisible');

            form.reset();
            overlay[1].remove();
        });

        submit.addEventListener('click', e => {
            e.preventDefault();

            const formData = new FormData(form);


            if (formData.get('surname') === '' || formData.get('name') === '' || formData.get('phone') === '') {
                container.append(create.createSuccess('no'));
                this.successControl();
            } else {
                requestItemsArr.forEach(e => {
                    e.surname = formData.get('surname').trim();
                    e.name = formData.get('name').trim();
                    e.phone = formData.get('phone').trim();
                    // e.distance = distance;
                    e.date = this.getCurrentDate();
                    e.column = 'one';
                    e.service = service;
                });


                dbRequest.addRequest(requestItemsArr[0], service, container, 'yes', requestItemsArr);
                const calcContainer = document.getElementById('calcContainer');
                const calcButtons = document.querySelector('.calc__final-buttons');
                calcButtons.remove();
                calcContainer.append(create.createCalcButtons('yes'));
                this.controlCalcButtons(requestItemsArr, itemId, service, 'yes');


                form.reset();
                overlay[1].remove();
                outerOverlay.remove();
            }
        });
    }

    successControl = () => {
        const container = document.querySelector('.container');
        const successOverlay = document.querySelector('.overlay-success');

        container.style.cursor = 'pointer';

        successOverlay.addEventListener('click', e => {
            successOverlay.remove();
            container.style.cursor = 'auto';
            document.body.style.overflow = 'visible';
        });
    };

    controlStrip = (requestItemsArr, itemId, service) => {
        const container = document.getElementById('calcContainer');

        container.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains('calc__delete-strip')) {
                const strip = target.closest('.calc__strip-container');
                const calcButtons = document.querySelector('.calc__final-buttons');
                const id = strip.dataset.id;

                requestItemsArr.forEach(e => {
                    if (e.id === +id) {
                        requestItemsArr.splice(requestItemsArr.indexOf(e), 1);
                    }
                });

                console.log(requestItemsArr);

                calcButtons.remove();
                container.append(create.createCalcButtons('yes'));
                this.controlCalcButtons(requestItemsArr, itemId, service, 'yes');
                strip.remove();

            }
        })
    }

    getItemByPanelId = async (elem) => {
        let panelId = elem.dataset.panelId;
        let requests = await admin.getAllRequests();
        let item = requests.find(request => +request.panelId === +panelId);

        return item;
    }

    dragControl = async () => {
        const draggables = document.querySelectorAll('.draggable')
        const containers = document.querySelectorAll('.drag-container')

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging')
            })
            draggable.addEventListener('dragend', async () => {
                draggable.classList.remove('dragging');

                const item = await this.getItemByPanelId(draggable);
                if (draggable.closest('.kanban__column-content').classList.contains('one')) {
                    dbRequest.editRequest({
                        column: 'one'
                    }, item.service, item.id);
                } else if (draggable.closest('.kanban__column-content').classList.contains('two')) {
                    dbRequest.editRequest({
                        column: 'two'
                    }, item.service, item.id);
                } else if (draggable.closest('.kanban__column-content').classList.contains('three')) {
                    dbRequest.editRequest({
                        column: 'three'
                    }, item.service, item.id);
                } else if (draggable.closest('.kanban__column-content').classList.contains('four')) {
                    dbRequest.editRequest({
                        column: 'four'
                    }, item.service, item.id);
                }
            })
        })
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                const draggable = document.querySelector('.dragging')
                container.appendChild(draggable)
                this.columnControl();
            })
        })
    }
    columnControl = () => {
        const columns = document.querySelectorAll('.kanban__column-content');
        const count = document.querySelectorAll('.kanban__column-count');

        let i = 0;
        count.forEach(e => {
            e.textContent = columns[i].children.length;
            i++;
        })

        let childAmount = [];
        columns.forEach(e => {
            childAmount.push(e.children.length)
        })
        const maxValue = Math.max(...childAmount);

        columns.forEach(e => {
            e.style.height = (+maxValue * 183) + (+maxValue * 10) + 'px'
        })

    }

    cardDeleteControl = () => {
        let allDeleteButtons = document.querySelectorAll('.kanban__card-delete');

        allDeleteButtons.forEach(e => {
            e.addEventListener('click', async () => {
                const card = e.closest('.kanban__card');
                const item = await this.getItemByPanelId(card);
                console.log(item);

                dbRequest.deleteRequest(item.service, item.id);
                card.remove();
                this.columnControl();
            });
        });
    }

    cardEditControl = async () => {
        let allEditButtons = document.querySelectorAll('.kanban__card-open');
        const container = document.querySelector('.container');

        allEditButtons.forEach(e => {
            e.addEventListener('click', async () => {
                const card = e.closest('.kanban__card');
                const item = await this.getItemByPanelId(card);

                if (item.service === 'request') {
                    container.append(create.createRequestModalAdmin());
                    this.editModalAdminControl(item);
                } else if (item.service === 'partner') {
                    container.append(create.createPartnerModal());
                    this.editPartnerModalAdmin(item);
                } else if (item.service === 'trans') {
                    container.append(create.createTransModalAdmin());
                    this.editTransModalAdmin(item);
                }

            })
        })
    }

    editModalAdminControl = async (item) => {
        const select = document.querySelector('.request-modal__select');
        const amount = document.getElementById('amount');
        const index = document.getElementById('index');
        const comment = document.getElementById('comment');
        const surname = document.getElementById('surname');
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const edit = document.getElementById('confirm');
        const cancel = document.getElementById('cancel');
        const form = document.getElementById('requestForm');
        const modal = document.querySelector('.overlay');

        select.value = item.type;
        amount.value = item.amount;
        index.value = item.index;
        comment.value = item.comment;
        surname.value = item.surname;
        name.value = item.name;
        phone.value = item.phone;

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            modal.remove();
        });

        edit.addEventListener('click', async e => {
            e.preventDefault();
            dbRequest.editRequest({
                type: select.value,
                amount: amount.value,
                index: index.value,
                comment: comment.value,
                surname: surname.value,
                name: name.value,
                phone: phone.value
            }, item.service, item.id);

            form.reset();
            admin.renderCards();
            modal.remove();
        })
    }

    editPartnerModalAdmin = async (item) => {
        const company = document.getElementById('company');
        const select = document.querySelector('.partner-modal__select');
        const inn = document.getElementById('inn');
        const comment = document.getElementById('comment');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const edit = document.querySelector('.partner-modal__send');
        const cancel = document.querySelector('.partner-modal__cross');
        const form = document.querySelector('.partner-modal__form');
        const modal = document.querySelector('.overlay');

        select.value = item.type;
        company.value = item.company;
        inn.value = item.inn;
        comment.value = item.comment;
        email.value = item.email;
        phone.value = item.phone;

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            modal.remove();
        });

        edit.addEventListener('click', async e => {
            e.preventDefault();
            await dbRequest.editRequest({
                type: select.value,
                inn: inn.value,
                comment: comment.value,
                company: company.value,
                email: email.value,
                phone: phone.value
            }, item.service, item.id);

            form.reset();
            // await admin.renderCards();
            modal.remove();
        })
    }

    editTransModalAdmin = async (item) => {
        const indexFrom = document.getElementById('indexFrom');
        const indexTo = document.getElementById('indexTo');
        const size = document.getElementById('size');
        const weight = document.getElementById('weight');
        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        const phone = document.getElementById('phone');
        const edit = document.getElementById('confirm');
        const cancel = document.getElementById('cancel');
        const form = document.getElementById('requestForm');
        const modal = document.querySelector('.overlay');


        indexFrom.value = item.indexFrom;
        indexTo.value = item.indexTo;
        surname.value = item.surname;
        name.value = item.name;
        phone.value = item.phone;
        size.value = item.size;
        weight.value = item.weight;

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            modal.remove();
        });

        edit.addEventListener('click', async e => {
            e.preventDefault();
            dbRequest.editRequest({
                indexFrom: indexFrom.value,
                indexTo: indexTo.value,
                size: size.value,
                weight: weight.value,
                surname: surname.value,
                name: name.value,
                phone: phone.value
            }, item.service, item.id);

            form.reset();
            admin.renderCards();
            modal.remove();
        })
    }


    searchControl = async () => {
        const search = document.querySelector('.kanban__input');
        const cancel = document.querySelector('.kanban__input-cancel');

        const searchArray = async () => {
            const arr = await admin.getAllRequests();


            if (search.value === '') {
                admin.renderCards();
            } else {
                const results = [];
                arr.forEach(e => {
                    for (let key in e) {
                        if (e.hasOwnProperty(key)) {
                            if (String(e[key]).includes(search.value)) {
                                if (results.indexOf(e) === -1) {
                                    results.push(e);
                                }
                            }
                        }
                    }
                });

                admin.renderCards('no', 'yes', results);
            }
        }


        let timeout;
        search.addEventListener('input', () => {
            clearTimeout(timeout);

            timeout = setTimeout(searchArray, 500);
        });

        cancel.addEventListener('click', e => {
            e.preventDefault();
            search.value = '';
            admin.renderCards();
        })
    }

    searchControlNews = async () => {
        const search = document.querySelector('#searchNews');
        const cancel = document.querySelector('#searchNewsCancel');

        const searchArray = async () => {
            const arr = await dbRequest.getNews();


            if (search.value === '') {
                admin.renderNews();
            } else {
                const results = [];
                arr.forEach(e => {
                    for (let key in e) {
                        if (e.hasOwnProperty(key)) {
                            if (String(e[key]).includes(search.value)) {
                                if (results.indexOf(e) === -1) {
                                    results.push(e);
                                }
                            }
                        }
                    }
                });

                admin.renderNews('no', 'yes', results);
            }
        }


        let timeout;
        search.addEventListener('input', () => {
            clearTimeout(timeout);

            timeout = setTimeout(searchArray, 500);
        });

        cancel.addEventListener('click', e => {
            e.preventDefault();
            search.value = '';
            admin.renderNews();
        })
    }

    priceControl = async () => {
        const reqInput = document.getElementById('priceRequest');
        const transInput = document.getElementById('priceTrans');

        const reqSubmit = document.getElementById('priceSubmitRequest');
        const transSubmit = document.getElementById('priceSubmitTrans');

        const price = await dbRequest.getPrice();

        reqInput.value = await price[0].kmCost;
        transInput.value = await price[0].transCost;

        reqSubmit.addEventListener('click', e => {
            e.preventDefault();
            if (reqInput !== '' || reqInput !== null) {
                dbRequest.setPrice({
                    kmCost: reqInput.value
                })
            }
        });

        transSubmit.addEventListener('click', e => {
            e.preventDefault();
            if (transInput !== '' || transInput !== null) {
                dbRequest.setPrice({
                    kmCost: transInput.value
                })
            }
        });
    }

    deleteAdminControl = () => {
        const container = document.querySelector('.admins');

        container.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('calc__delete-strip')) {
                const strip = target.closest('.calc__strip-container');
                dbRequest.deleteAdmins(strip.dataset.id);
                strip.remove();
            }
        })
    }

    addAdminControl = () => {
        const addButton = document.querySelector('.admins__add');
        const container = document.querySelector('.container');

        addButton.addEventListener('click', e => {
            e.preventDefault();
            container.append(create.createAdminModal());
            this.adminModalControl();
        })

    }

    editAdminControl = () => {
        const container = document.querySelector('.admins');
        const mainContainer = document.querySelector('.container');

        container.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('calc__strip') || target.classList.contains('calc__strip-type')) {
                let strip;
                if (target.classList.contains('calc__strip-type')) {
                    strip = target.closest('.calc__strip')
                } else {
                    strip = target;
                }
                mainContainer.append(create.createAdminModal());
                this.adminModalControl('yes', strip.closest('.calc__strip-container').dataset.id);
            }
        })
    }

    adminModalControl = async (isEdit = 'no', id = '') => {
        const overlay = document.querySelector('.overlay');
        const form = document.querySelector('.request-modal__form');
        const submit = document.querySelector('#confirm');
        const cancel = document.querySelector('#cancel');

        const name = document.querySelector('#name');
        const login = document.querySelector('#login');
        const password = document.querySelector('#password');
        const level = document.querySelector('#level');

        console.log(id);

        if (isEdit !== 'no') {
            const admin = await dbRequest.getAdmins(id);
            console.log(admin);

            name.value = admin.name;
            login.value = admin.login;
            password.value = admin.password;
            level.value = admin.level;
        }

        submit.addEventListener('click', e => {
            e.preventDefault();
            const formData = new FormData(form);

            if (formData.get('name') !== '' || formData.get('login') !== '' || formData.get('password') !== '' || formData.get('level') !== '' ) {

                if (isEdit === 'no') {
                    dbRequest.addAdmins({
                        name: formData.get('name'),
                        login: formData.get('login'),
                        password: formData.get('password'),
                        level: formData.get('level'),
                    }, 'POST', 'admins');
                } else {
                    dbRequest.addAdmins({
                        name: formData.get('name'),
                        login: formData.get('login'),
                        password: formData.get('password'),
                        level: formData.get('level'),
                    }, 'PATCH', `admins/${id}`);
                }


                form.reset();
                overlay.remove();
            }
        })

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            overlay.remove();
        })
    }

    deleteNewsControl = async () => {
        const container = document.querySelector('.news-admin');

        container.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('news__news-delete')) {
                const newsItem = target.closest('.logistic__news-link');
                dbRequest.deleteNews(newsItem.dataset.id);
                newsItem.remove();
            }
        })
    }

    addNewsControl = () => {
        const addButton = document.querySelector('.news__add');
        const container = document.querySelector('.container');

        addButton.addEventListener('click', e => {
            e.preventDefault();
            container.append(create.createNewsModal());
            this.newsModalControl();
        })

    }

    newsModalControl = async (isEdit = 'no', id = '') => {
        const overlay = document.querySelector('.overlay');
        const form = document.querySelector('.request-modal__form');
        const submit = document.getElementById('confirm');
        const cancel = document.getElementById('cancel');

        const image = document.getElementById('image');
        const title = document.getElementById('title');
        const text = document.getElementById('text');

        let path = ''

        if (isEdit !== 'no') {
            const newItem = await dbRequest.getNewItem(id);
            console.log(newItem);

            title.value = await newItem.title;
            text.value = newItem.text;
            image.filename = newItem.image;
        }

        const controlImg = async () => {
            const file =  document.querySelector('.file-input');
            const preview = document.getElementById('preview');
            const wrapper = document.querySelector('.preview-wrapper');
            const overweight = document.querySelector('.img-overweight');

            overweight.textContent = '';
            preview.src = '';
            file.value = '';
            preview.hidden = true;
            wrapper.hidden = true;

            if (path !== '') {
                wrapper.hidden = false;
                preview.hidden = false;
                preview.src = `/img/images/${path}`;
            }

            preview.addEventListener('click', e => {
                preview.src = '';
                preview.hidden = true;
                wrapper.hidden = true;
                file.value = '';
                path = '';
            });

            file.addEventListener('click', () => {
                overweight.textContent = '';
                if (file.files.length > 0) {
                    file.value = '';
                    wrapper.hidden = true;
                    preview.src = '';
                    path = '';
                }
            })

            file.addEventListener('change', async () => {
                if (file.files.length > 0) {
                    if ((file.files[0].size / (1024*1024)).toFixed(2) > 1) {
                        overweight.textContent = 'Изображение не должно превышать размер 1 Мб'
                    } else {
                        const chosenFile = file.files[0]
                        const src = URL.createObjectURL(chosenFile);

                        path = `${chosenFile.name}`;

                        console.log(file.files[0]);
                        wrapper.hidden = false;
                        preview.hidden = false;
                        preview.src = src;
                    }
                }
            });

        }
        controlImg();

        submit.addEventListener('click', e => {
            e.preventDefault();
            const formData = new FormData(form);

            if (formData.get('name') !== '' || formData.get('text') !== '' || formData.get('image') !== '') {

                if (isEdit === 'no') {
                    dbRequest.addNews({
                        title: formData.get('title'),
                        text: formData.get('text'),
                        image: path,
                        date: this.getCurrentDate(),
                    }, 'POST', 'news');
                } else {
                    dbRequest.addNews({
                        title: formData.get('title'),
                        text: formData.get('text'),
                        image: path,
                        date: this.getCurrentDate(),
                    }, 'PATCH', `news/${id}`);
                }


                form.reset();
                overlay.remove();
            }
        });

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.reset();
            overlay.remove();
        })
    }

    editNewsControl = () => {
        const container = document.querySelector('.news-admin');
        const mainContainer = document.querySelector('.container');

        container.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('news__news-edit')) {
                let newsItem = target.closest('.logistic__news-link');
                mainContainer.append(create.createNewsModal());
                this.newsModalControl('yes', newsItem.dataset.id)
            }
        })
    }

    brandsControl = () => {
        const cardOne = document.getElementById('distCard1');
        const cardTwo = document.getElementById('distCard2');
        const cardThree = document.getElementById('distCard3');
        const cardFour = document.getElementById('distCard4');
        const container = document.querySelector('.container');


        cardOne.addEventListener('click', e => {
            container.append(create.createBrandsModal('БАКАЛЕЯ', 'modal1.png'));
            this.brandsModalControl();
            document.body.style.overflow = 'hidden'
        })
        cardTwo.addEventListener('click', e => {
            container.append(create.createBrandsModal('КОНДИТЕРСКАЯ ПРОДУКЦИЯ', 'modal3.png'));
            this.brandsModalControl();
            document.body.style.overflow = 'hidden'
        })
        cardThree.addEventListener('click', e => {
            container.append(create.createBrandsModal('ОХЛАЖДЁННЫЕ ТОВАРЫ ', 'modal2.png'));
            this.brandsModalControl();
            document.body.style.overflow = 'hidden'
        })
        cardFour.addEventListener('click', e => {
            container.append(create.createBrandsModal('НЕПРОДОВОЛЬСТВЕННЫЕ ТОВАРЫ', 'modal4.png'));
            this.brandsModalControl();
            document.body.style.overflow = 'hidden'
        })
    }
    brandsModalControl = () => {
        const overlay = document.querySelector('.overlay');
        const cross = document.querySelector('.brands__cross');

        cross.addEventListener('click', e => {
            e.preventDefault();
            document.body.style.overflow = 'visible'
            overlay.remove();
        })
    }
}

