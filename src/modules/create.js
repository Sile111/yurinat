export class Create {
    createPartnerModal = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
          <div class="partner-modal">
                <section class="partner-modal__header">
                    <p class="partner-modal__title">Стать партнером</p>
                    <svg class="partner-modal__cross" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9287 17.9304C17.3032 18.5543 16.2896 18.5543 15.6633 17.9304L9.99961 12.2675L4.33593 17.9304C3.71037 18.5543 2.69603 18.5543 2.07047 17.9304C1.4449 17.2985 1.4449 16.2907 2.07047 15.6589L7.73414 9.99595L2.07047 4.33312C1.4449 3.70925 1.4449 2.69339 2.07047 2.06951C2.69603 1.44564 3.71037 1.44564 4.33593 2.06951L9.99961 7.73244L15.6633 2.06951C16.2896 1.44564 17.3032 1.44564 17.9287 2.06951C18.5551 2.69339 18.5551 3.70925 17.9287 4.33312L12.2651 9.99595L17.9287 15.6589C18.5551 16.2907 18.5551 17.2985 17.9287 17.9304ZM14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312581 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z" fill="#4BB82F"/>
                    </svg>
                </section>

                <form class="partner-modal__form">
                <section class="partner-modal__input-container">
                    <div class="partner-modal__input-data">
                        <input type="text" required class="partner-modal__input" id="company" name="company">
                        <div class="partner-modal__underline"></div>
                        <label for="company" class="partner-modal__label">Юридическое лицо</label>
                    </div>
                    <div class="partner-modal__input-data">
                        <label for="type" class="partner-modal__label-input">
                        <select name="type" id="type" class="partner-modal__select">
                            <option value="" selected disabled>Тип товара</option>
                            <option value="Бакалея">Бакалея</option>
                            <option value="Кондитерская продукция">Кондитерская продукция</option>
                            <option value="Замороженные / Охлажденные товары">Замороженные / Охлажденные товары</option>
                            <option value="Непродовольственная продукция">Непродовольственная продукция</option>
                        </select>
                        <div class="partner-modal__underline"></div>
                        </label>
                    </div>
                    <div class="partner-modal__input-data">
                        <input oninput="regExp.phones(this)" type="number" required class="partner-modal__input" id="phone" name="phone">
                        <div class="partner-modal__underline"></div>
                        <label for="phone" class="partner-modal__label">Номер телефона</label>
                    </div>
                    <div class="partner-modal__input-data">
                        <input type="text" required class="partner-modal__input" id="email" name="email">
                        <div class="partner-modal__underline"></div>
                        <label for="email" class="partner-modal__label">e-mail</label>
                    </div>
                    <div class="partner-modal__input-data">
                        <input  oninput="regExp.inns(this)" type="number" required class="partner-modal__input" id="inn" name="inn">
                        <div class="partner-modal__underline"></div>
                        <label for="inn" class="partner-modal__label">ИНН</label>
                    </div>
                    <div class="partner-modal__input-data partner-modal__input-data_textarea">
                        <textarea class="partner-modal__textarea" required id="comment" name="comment"></textarea>
                        <div class="partner-modal__underline"></div>
                        <label for="comment" class="partner-modal__label">Комментарий</label>
                    </div>
                </section>

                <button class="partner-modal__send btn">Отправить</button>
                </form>
            </div>
    `);

        return overlay;
    };

    createNewsCard = (id, img, title, text, date, className) => {
        const card = document.createElement('a');
        card.href = `news-item.html?=${id}`;
        card.classList.add('logistic__news-link');
        card.classList.add('link');

        if (img !== 'news-img.png') {
            img = 'news-img-replace.png';
        }

        card.insertAdjacentHTML('beforeend', `
            <div class="${className}__news-card">
                <div class="${className}__news-item">
                    <img src="img/images/${img}" alt="news-img" class="${className}__news-img">
                        <section class="${className}__news-info">
                            <p class="${className}__news-title">${title.length > 17 ? title.substring(0, 17) + '...' : title}</p>
                            <p class="${className}__news-text">${text.length > 120 ? text.substring(0, 120) + '...' : text}</p>
                        </section>
                </div>
                <p class="${className}__news-date">${date}</p>
            </div>
        `);

        return card;
    }

    createCalcStrip = (leftInfo, rightInfo, id) => {
        const calcStrip = document.createElement('div');
        calcStrip.classList.add('calc__strip-container');
        calcStrip.dataset.id = `${id}`;

        calcStrip.insertAdjacentHTML('beforeend', `
                        <section class="calc__strip" id="calcStrip">
                            <p class="calc__strip-type">${leftInfo}</p>
                            <p class="calc__strip-amount">${rightInfo.length >= 34 ? rightInfo.substring(0, 32) + '...' : rightInfo}</p>
                        </section>
                        <button class="calc__delete-strip">
                        </button>
        `);

        return calcStrip;
    };

    createCalcButtons = (ifAdd = 'no') => {
        const calcButtons = document.createElement('div');
        calcButtons.classList.add('calc__final-buttons');
        calcButtons.id = 'calcFinalButtons';

        if (ifAdd !== 'no') {
            calcButtons.insertAdjacentHTML('beforeend', `
                 <button class="calc__calc-button" id="calcCalcButton">Рассчитать стоимость</button>
                 <button class="calc__add-button" id="calcAddButton">+   Добавить товар</button>
        `);
        } else {
            calcButtons.insertAdjacentHTML('beforeend', `
                 <button class="calc__calc-button" id="calcCalcButton">Рассчитать стоимость</button>
        `);
        }


        return calcButtons;
    }

    createRequestModal = () => {
        const requestModal = document.createElement('div');
        requestModal.classList.add('request-modal');
        requestModal.id='requestModal';

        requestModal.insertAdjacentHTML('beforeend', `
              <section class="request-modal__header">
                            <p class="request-modal__title">Куда доставить?</p>
                            <p class="request-modal__title">Что вы заказываете?</p>
              </section>

                        <form class="request-modal__form" id="requestForm">
                            <section class="request-modal__input-container">
                                <div class="request-modal__input-data request-modal__input-data_radio">
                                    <section class="request-modal__radio-container">
                                        <div class="request-modal__radio">
                                            <input class="request-modal__input_radio" id="radio-1" type="radio" name="country" value="Россия" checked>
                                            <label for="radio-1">Россия</label>
                                        </div>

                                        <div class="request-modal__radio">
                                            <input class="request-modal__input_radio" id="radio-2" type="radio" name="country" value="Латвия" disabled>
                                            <label for="radio-2">Латвия (недоступно)</label>
                                        </div>
                                    </section>
                                    <p class="request-modal__label request-modal__label_radio">Страна</p>
                                </div>
                                <div class="request-modal__input-data">
                                    <label for="goods-type" class="request-modal__label-input">
                                        <select name="type" id="goods-type" class="request-modal__select">
                                            <option value="" selected disabled>Тип товара</option>
                                            <option value="Бакалея">Бакалея</option>
                                            <option value="Кондитерская продукция">Кондитерская продукция</option>
                                            <option value="Замороженные / Охлажденные товары">Замороженные / Охлажденные товары</option>
                                            <option value="Непродовольственная продукция">Непродовольственная продукция</option>
                                        </select>
                                        <div class="request-modal__underline"></div>
                                    </label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="amount" type="text" required class="request-modal__input" id="amount">
                                    <div class="request-modal__underline"></div>
                                    <label for="amount" class="request-modal__label">Количество</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input  oninput="regExp.indexes(this)" name="index" type="number" required class="request-modal__input" id="index">
                                    <div class="request-modal__underline"></div>
                                    <label for="index" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data request-modal__input-data_textarea">
                                    <textarea name="comment" class="request-modal__textarea" required id="comment"></textarea>
                                    <div class="request-modal__underline request-modal__underline_textarea"></div>
                                    <label for="comment" class="request-modal__label">Комментарий</label>
                                </div>
                            </section>

                            <section class="request-modal__button-container">
                                <button class="request-modal__cancel" id="cancel">Отмена</button>
                                <button class="request-modal__confirm" id="confirm">Добавить</button>
                            </section>
                        </form>
        `);

        return requestModal;
    }

    createRequestModalAdmin = () => {
        const requestModal = document.createElement('div');
        requestModal.classList.add('request-modal');
        requestModal.id='requestModal';

        requestModal.insertAdjacentHTML('beforeend', `
              <section class="request-modal__header">
                            <p class="request-modal__title">Куда доставить?</p>
                            <p class="request-modal__title">Что заказывают?</p>
              </section>

                        <form class="request-modal__form" id="requestForm">
                            <section class="request-modal__input-container request-modal__input-container_admin">
                                <div class="request-modal__input-data request-modal__input-data_radio">
                                    <section class="request-modal__radio-container">
                                        <div class="request-modal__radio">
                                            <input class="request-modal__input_radio" id="radio-1" type="radio" name="country" value="Россия" checked>
                                            <label for="radio-1">Россия</label>
                                        </div>

                                        <div class="request-modal__radio">
                                            <input class="request-modal__input_radio" id="radio-2" type="radio" name="country" value="Латвия" disabled>
                                            <label for="radio-2">Латвия (недоступно)</label>
                                        </div>
                                    </section>
                                    <p class="request-modal__label request-modal__label_radio">Страна</p>
                                </div>
                                <div class="request-modal__input-data">
                                    <label for="goods-type" class="request-modal__label-input">
                                        <select name="type" id="goods-type" class="request-modal__select">
                                            <option value="" selected disabled>Тип товара</option>
                                            <option value="Бакалея">Бакалея</option>
                                            <option value="Кондитерская продукция">Кондитерская продукция</option>
                                            <option value="Замороженные / Охлажденные товары">Замороженные / Охлажденные товары</option>
                                            <option value="Непродовольственная продукция">Непродовольственная продукция</option>
                                        </select>
                                        <div class="request-modal__underline"></div>
                                    </label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="amount" type="text" required class="request-modal__input" id="amount">
                                    <div class="request-modal__underline"></div>
                                    <label for="amount" class="request-modal__label">Количество</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input  oninput="regExp.indexes(this)" name="index" type="number" required class="request-modal__input" id="index">
                                    <div class="request-modal__underline"></div>
                                    <label for="index" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data request-modal__input-data_textarea">
                                    <textarea name="comment" class="request-modal__textarea" required id="comment"></textarea>
                                    <div class="request-modal__underline request-modal__underline_textarea"></div>
                                    <label for="comment" class="request-modal__label">Комментарий</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="surname" oninput="regExp.names(this)" type="text" required class="request-modal__input" id="surname">
                                    <div class="request-modal__underline"></div>
                                    <label for="surname" class="request-modal__label">Фамилия</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="name" oninput="regExp.names(this)" type="text" required class="request-modal__input" id="name">
                                    <div class="request-modal__underline"></div>
                                    <label for="name" class="request-modal__label">Имя</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="phone" oninput="regExp.phones(this)" type="text" required class="request-modal__input" id="phone">
                                    <div class="request-modal__underline"></div>
                                    <label for="phone" class="request-modal__label">Телефон</label>
                                </div>
                            </section>

                            <section class="request-modal__button-container">
                                <button class="request-modal__cancel" id="cancel">Отмена</button>
                                <button class="request-modal__confirm" id="confirm">Редактировать</button>
                            </section>
                        </form>
        `);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.append(requestModal);

        return overlay;
    }

    createTransModal = () => {
        const requestModal = document.createElement('div');
        requestModal.classList.add('request-modal');
        requestModal.id='requestModal';

        requestModal.insertAdjacentHTML('beforeend', `
              <section class="request-modal__header">
                            <p class="request-modal__title">Откуда доставить?</p>
                            <p class="request-modal__title">Куда доставить?</p>
              </section>

                        <form class="request-modal__form" id="requestForm">
                            <section class="request-modal__input-container">
                                <div class="request-modal__input-data">
                                    <input  oninput="regExp.indexes(this)" name="indexFrom" type="number" required class="request-modal__input" id="indexFrom">
                                    <div class="request-modal__underline"></div>
                                    <label for="indexFrom" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.indexes(this)" name="indexTo" type="number" required class="request-modal__input" id="indexTo">
                                    <div class="request-modal__underline"></div>
                                    <label for="indexTo" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.sizes(this)" name="size" type="text" required class="request-modal__input" id="size">
                                    <div class="request-modal__underline"></div>
                                    <label for="size" class="request-modal__label">Габариты груза</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.weights(this)" name="weight" type="number" required class="request-modal__input" id="weight">
                                    <div class="request-modal__underline"></div>
                                    <label for="weight" class="request-modal__label">Вес груза (кг.)</label>
                                </div>
                            </section>
                            <p class="request-modal__size-warning">В любой последовательности. <br>
                                Пример: 45 80 100
                            </p>

                            <section class="request-modal__button-container request-modal__button-container_trans">
                                <p class="request-modal__city-warning">*Только по городу Калининград</p>
                                <button class="request-modal__cancel" id="cancel">Отмена</button>
                                <button class="request-modal__confirm" id="confirm">Добавить</button>
                            </section>
                        </form>
        `);

        return requestModal;
    }

    createTransModalAdmin = () => {
        const requestModal = document.createElement('div');
        requestModal.classList.add('request-modal');
        requestModal.id='requestModal';

        requestModal.insertAdjacentHTML('beforeend', `
              <section class="request-modal__header">
                            <p class="request-modal__title">Откуда доставить?</p>
                            <p class="request-modal__title">Куда доставить?</p>
              </section>

                        <form class="request-modal__form" id="requestForm">
                            <section class="request-modal__input-container request-modal__input-container_admin">
                                <div class="request-modal__input-data">
                                    <input  oninput="regExp.indexes(this)" name="indexFrom" type="number" required class="request-modal__input" id="indexFrom">
                                    <div class="request-modal__underline"></div>
                                    <label for="indexFrom" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.indexes(this)" name="indexTo" type="number" required class="request-modal__input" id="indexTo">
                                    <div class="request-modal__underline"></div>
                                    <label for="indexTo" class="request-modal__label">Индекс</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.sizes(this)" name="size" type="text" required class="request-modal__input" id="size">
                                    <div class="request-modal__underline"></div>
                                    <label for="size" class="request-modal__label">Габариты груза</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input oninput="regExp.weights(this)" name="weight" type="number" required class="request-modal__input" id="weight">
                                    <div class="request-modal__underline"></div>
                                    <label for="weight" class="request-modal__label">Вес груза (кг.)</label>
                                </div>
                                         <div class="request-modal__input-data">
                                    <input name="surname" oninput="regExp.names(this)" type="text" required class="request-modal__input" id="surname">
                                    <div class="request-modal__underline"></div>
                                    <label for="surname" class="request-modal__label">Фамилия</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="name" oninput="regExp.names(this)" type="text" required class="request-modal__input" id="name">
                                    <div class="request-modal__underline"></div>
                                    <label for="name" class="request-modal__label">Имя</label>
                                </div>
                                <div class="request-modal__input-data">
                                    <input name="phone" oninput="regExp.phones(this)" type="text" required class="request-modal__input" id="phone">
                                    <div class="request-modal__underline"></div>
                                    <label for="phone" class="request-modal__label">Телефон</label>
                                </div>
                            </section>

                            <section class="request-modal__button-container request-modal__button-container_trans">
                                <p class="request-modal__city-warning">*Только по городу Калининград</p>
                                <button class="request-modal__cancel" id="cancel">Отмена</button>
                                <button class="request-modal__confirm" id="confirm">Добавить</button>
                            </section>
                        </form>
        `);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.append(requestModal);

        return overlay;
    }

    createFinalRequest = (price) => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
                 <div class="final-request">
                <div class="final-request__slider">
                    <button class="final-request__arrow final-request__arrow_left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                            <ellipse cx="22.8" cy="22.7583" rx="22.8" ry="22.7583" transform="matrix(-1 0 0 1 45.6001 0)" fill="#4BB82F"/>
                            <path d="M11.5819 24.172C10.8008 23.391 10.8008 22.1246 11.5819 21.3436L24.3098 8.61568C25.0909 7.83463 26.3572 7.83463 27.1382 8.61568C27.9193 9.39673 27.9193 10.6631 27.1382 11.4441L15.8245 22.7578L27.1382 34.0715C27.9193 34.8526 27.9193 36.1189 27.1382 36.8999C26.3572 37.681 25.0909 37.681 24.3098 36.8999L11.5819 24.172ZM15.5041 24.7578H12.9961V20.7578H15.5041V24.7578Z" fill="white"/>
                        </svg>
                    </button>


                    <button class="final-request__arrow final-request__arrow_right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                            <ellipse cx="22.8" cy="22.7583" rx="22.8" ry="22.7583" fill="#4BB82F"/>
                            <path d="M34.0182 24.172C34.7993 23.391 34.7993 22.1246 34.0182 21.3436L21.2903 8.61568C20.5092 7.83463 19.2429 7.83463 18.4619 8.61568C17.6808 9.39673 17.6808 10.6631 18.4619 11.4441L29.7756 22.7578L18.4619 34.0715C17.6808 34.8526 17.6808 36.1189 18.4619 36.8999C19.2429 37.681 20.5092 37.681 21.2903 36.8999L34.0182 24.172ZM30.096 24.7578H32.604V20.7578H30.096V24.7578Z" fill="white"/>
                        </svg>
                    </button>
                </div>

                <div class="final-request__pages">
                    <p class="final-request__page">1/4</p>
                </div>

                <div class="final-request__bottom">
                    <section class="final-request__warning">
                        <p class="final-request__price">Примерная стоимость: ${price}+ руб.</p>
                        <p class="final-request__price-warning">(*Не является финальной. <br>
                            Отображает минимальную цену)</p>
                    </section>

                    <section class="final-request__buttons">
                        <button class="final-request__call-button">Заказать обратный звонок</button>
                        <button class="final-request__cancel-button">Назад</button>
                    </section>
                </div>
            </div>
        `);

        return overlay
    }

    createFinalSlide = (country, type, amount, index, comment) => {
        const finalSlide = document.createElement('div');
        finalSlide.classList.add('final-request__slide-container');

        finalSlide.insertAdjacentHTML('beforeend', `
                        <section class="final-request__slide-header">
                            <p class="final-request__header-text">Итого:</p>
                            <p class="final-request__header-text">Заказ товара</p>
                        </section>
                        <section class="final-request__slide-content">
                            <p class="final-request__slide-text">Страна: ${country}</p>
                            <p class="final-request__slide-text">Тип товара: ${type}</p>
                            <p class="final-request__slide-text">Количество: ${amount}</p>
                            <p class="final-request__slide-text">Индекс: ${index}</p>
                            <p class="final-request__slide-text final-request__slide-text_comment">Комментарий: ${comment.length > 214 ? comment.substring(0, 211) + '...' : comment}</p>
                        </section>
        `);

        return finalSlide;
    }

    createFinaSlideTrans = (indexFrom, indexTo, size, weight) => {
        const finalSlide = document.createElement('div');
        finalSlide.classList.add('final-request__slide-container');

        finalSlide.insertAdjacentHTML('beforeend', `
                        <section class="final-request__slide-header">
                            <p class="final-request__header-text">Итого:</p>
                            <p class="final-request__header-text">Транспортировка товара</p>
                        </section>
                        <section class="final-request__slide-content">
                            <p class="final-request__slide-text">Индекс от: ${indexFrom}</p>
                            <p class="final-request__slide-text">Индекс до: ${indexTo}</p>
                            <p class="final-request__slide-text">Габариты: ${size}</p>
                            <p class="final-request__slide-text">Вес: ${weight}</p>
                        </section>
        `);

        return finalSlide;
    }

    createPhoneCall = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
             <div class="phone-call">
                <div class="phone-call__header">
                    <p class="phone-call__title">Заказать обратный звонок</p>
                    <button class="phone-call__close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9287 17.9304C17.3032 18.5543 16.2896 18.5543 15.6633 17.9304L9.99961 12.2675L4.33593 17.9304C3.71037 18.5543 2.69603 18.5543 2.07047 17.9304C1.4449 17.2985 1.4449 16.2907 2.07047 15.6589L7.73414 9.99595L2.07047 4.33312C1.4449 3.70925 1.4449 2.69339 2.07047 2.06951C2.69603 1.44564 3.71037 1.44564 4.33593 2.06951L9.99961 7.73244L15.6633 2.06951C16.2896 1.44564 17.3032 1.44564 17.9287 2.06951C18.5551 2.69339 18.5551 3.70925 17.9287 4.33312L12.2651 9.99595L17.9287 15.6589C18.5551 16.2907 18.5551 17.2985 17.9287 17.9304ZM14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312581 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z" fill="#4BB82F"/>
                        </svg>
                    </button>
                </div>

                <form class="phone-call__form">
                    <section class="phone-call__inputs">
                        <div class="request-modal__input-data">
                            <input oninput="regExp.names(this)" name="surname" type="text" required class="request-modal__input" id="surname">
                            <div class="request-modal__underline"></div>
                            <label for="surname" class="request-modal__label">Фамилия</label>
                        </div>

                        <div class="request-modal__input-data">
                            <input oninput="regExp.names(this)" name="name" type="text" required class="request-modal__input" id="name">
                            <div class="request-modal__underline"></div>
                            <label for="name" class="request-modal__label">Имя</label>
                        </div>

                        <div class="request-modal__input-data">
                            <input oninput="regExp.phones(this)" name="phone" type="number" required class="request-modal__input" id="phone">
                            <div class="request-modal__underline"></div>
                            <label for="phone" class="request-modal__label">Номер телефона</label>
                        </div>
                    </section>

                    <button class="phone-call__submit btn">Заказать</button>
                </form>
            </div>
        `);

        return overlay
    };

    createSuccess = (isSuccess = 'yes') => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.classList.add('overlay-success');

        if (isSuccess === 'yes') {
            overlay.insertAdjacentHTML('beforeend', `
             <div class="success">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path d="M40 0C17.96 0 0 17.96 0 40C0 62.04 17.96 80 40 80C62.04 80 80 62.04 80 40C80 17.96 62.04 0 40 0ZM59.12 30.8L36.44 53.48C35.88 54.04 35.12 54.36 34.32 54.36C33.52 54.36 32.76 54.04 32.2 53.48L20.88 42.16C19.72 41 19.72 39.08 20.88 37.92C22.04 36.76 23.96 36.76 25.12 37.92L34.32 47.12L54.88 26.56C56.04 25.4 57.96 25.4 59.12 26.56C60.28 27.72 60.28 29.6 59.12 30.8Z" fill="#4BB82F"/>
                </svg>
                <p class="success__text">Успех!</p>
            </div>
        `);
        } else if (isSuccess === 'no') {
            overlay.insertAdjacentHTML('beforeend', `
             <div class="success">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.1425 50.6C55.12 51.575 55.12 53.1751 54.1425 54.1501C53.1675 55.1251 51.5825 55.1251 50.605 54.1501L40.015 43.5501L29.35 54.2249C28.365 55.1999 26.7701 55.1999 25.7851 54.2249C24.8026 53.2249 24.8026 51.625 25.7851 50.65L36.45 39.975L25.86 29.4C24.8825 28.425 24.8825 26.8249 25.86 25.8499C26.8325 24.8749 28.4175 24.8749 29.395 25.8499L39.985 36.4499L50.73 25.7001C51.715 24.7251 53.3074 24.7251 54.2924 25.7001C55.2749 26.7001 55.2749 28.2749 54.2924 29.2749L43.55 40.025L54.1425 50.6ZM40 0C17.9075 0 0 17.9 0 40C0 62.1 17.9075 80 40 80C62.0925 80 80 62.1 80 40C80 17.9 62.0925 0 40 0Z" fill="#D93333"/>
                </svg>
                <p class="success__text">Что-то пошло не так</p>
            </div>
        `);
        } else if (isSuccess === 'wait') {
            overlay.insertAdjacentHTML('beforeend', `
             <div class="success">
                <span class="loader"></span>
                <p class="success__text">Подождите</p>
            </div>
          `);
        }


        return overlay
    };

    createKanban = () => {
        const kanban = document.createElement('div');
        kanban.classList.add('kanban');
        kanban.id = 'kanban';

        kanban.insertAdjacentHTML('beforeend', `
            <div class="kanban">
            <div class="kanban__search">
                <input placeholder="Поиск..." type="text" class="kanban__input">
                <button class="kanban__input-cancel">Отмена</button>
            </div>
            <div class="kanban__container">
                <div class="kanban__column">
                    <div class="kanban__column-header header-one">
                        <p class="kanban__column-title">ПОСТУПИВШИЕ</p>
                        <p class="kanban__column-count">0</p>
                    </div>
                    <div class="kanban__column-content drag-container one">
                        
                    </div>
                </div>

                <div class="kanban__column">
                    <div class="kanban__column-header header-two">
                        <p class="kanban__column-title">ОБРАБОТАННЫЕ</p>
                        <p class="kanban__column-count">0</p>
                    </div>
                    <div class="kanban__column-content drag-container two">
                    </div>
                </div>

                <div class="kanban__column">
                    <div class="kanban__column-header header-three">
                        <p class="kanban__column-title">В ПРОЦЕССЕ ИСПОЛНЕНИЯ</p>
                        <p class="kanban__column-count">0</p>
                    </div>
                    <div class="kanban__column-content drag-container three">

                    </div>
                </div>

                <div class="kanban__column">
                    <div class="kanban__column-header header-four">
                        <p class="kanban__column-title">ЗАВЕРШЕННЫЕ</p>
                        <p class="kanban__column-count">0</p>
                    </div>
                    <div class="kanban__column-content drag-container four">

                    </div>
                </div>
            </div>
        </div>
        `);

        return kanban;

    }

    createKanbanCard = (item) => {
        const card = document.createElement('div');
        card.classList.add('kanban__card');
        card.classList.add('draggable');
        card.draggable = true;
        card.dataset.panelId = item.panelId;

        let service;
        let mainText;
        let text;
        let name;

        if (item.service === 'request') {
            service = 'Заказ товара';
            mainText = 'Тип товара:';
            text = item.type;
            name = item.surname + ' ' + item.name
        } else if (item.service === 'trans') {
            service = 'Транспортировка товара';
            mainText = 'Габариты: ' + item.size;
            text = 'Вес: ' + item.weight + ' кг.';
            name = item.surname + ' ' + item.name
        } else if (item.service === 'partner') {
            service = 'Партнерство';
            mainText = 'Юр. лицо:';
            text = item.company;
            name = item.email
        }

        card.insertAdjacentHTML('beforeend', `
            <div class="kanban__card-header">
                <p class="kanban__card-title">${service.length > 25 ? service.substring(0, 22) + '...' : service}</p>
                <p class="kanban__card-date">${item.date}</p>
            </div>
            <div class="kanban__card-content">
                <div class="kanban__card-paragraph">
                    <p class="kanban__card-text kanban__card-text_main">${name.length > 25 ? name.substring(0, 22) + '...' : name}</p>
                    <p class="kanban__card-text">${item.phone}</p>
                </div>
                <div class="kanban__card-name">
                    <p class="kanban__card-text kanban__card-text_main">${mainText.length > 25 ? mainText.substring(0, 22) + '...' : mainText}</p>
                    <p class="kanban__card-text">${text.length > 25 ? text.substring(0, 22) + '...' : text}</p>
                </div>
            </div>
            <div class="kanban__card-manage">
                <button class="kanban__card-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M1.75 24.8571C1.75 25.7602 3.0625 27 3.9375 27H17.0625C17.9375 27 19.25 25.7602 19.25 24.8571V7.71429H1.75V24.8571ZM21 2.82536H16.3333L14 0H7L4.66667 2.82536H0V5.65071H21V2.82536Z"
                              fill="#4BB82F"/>
                    </svg>
                </button>
                <button class="kanban__card-open">Открыть</button>
            </div>
        `);

        return card;
    }

    createPriceSet = () => {
        const priceSet = document.createElement('div');
        priceSet.classList.add('price');
        priceSet.id = 'price';

        priceSet.insertAdjacentHTML('beforeend', `
        <div class="price__container">
            <p class="price__text">Цена за километр (заказ.):</p>
            <input type="number" class="price__input" id="priceRequest">
            <button class="price__submit" id="priceSubmitRequest">ОК</button>
        </div>
        <div class="price__container">
            <p class="price__text">Цена за километр (трансп.):</p>
            <input type="number" class="price__input" id="priceTrans">
            <button class="price__submit" id="priceSubmitTrans">ОК</button>
        </div>
        `);

        return priceSet;
    }

    createStripAdmin = (leftInfo, middleInfoUp, middleInfoDown, rightInfo, id) => {
        const calcStrip = document.createElement('div');
        calcStrip.classList.add('calc__strip-container');
        calcStrip.dataset.id = `${id}`;

        calcStrip.insertAdjacentHTML('beforeend', `
                        <section class="calc__strip" id="calcStrip">
                            <p class="calc__strip-type">${leftInfo}</p>
                            <p class="calc__strip-type calc__strip-type_middle">${middleInfoUp} <br> ${middleInfoDown}</p>
                            <p class="calc__strip-type calc__strip-type_right">${rightInfo}</p>
                        </section>
                        <button class="calc__delete-strip">
                        </button>
        `);

        return calcStrip;
    };
    createAdmins = () => {
        const admins = document.createElement('div');
        admins.classList.add('admins');
        admins.id = 'admins';

        const adminsContainer = document.createElement('div');
        adminsContainer.classList.add('admins-container');

        const button = document.createElement('button');
        button.classList.add('admins__add');
        button.classList.add('btn');
        button.innerText = 'Добавить'

        adminsContainer.append(button, admins);

        return adminsContainer;
    }

    createAdminModal = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
        <div class="request-modal">
            <form class="request-modal__form" id="requestForm">
                <section class="request-modal__input-container request-modal__input-container_admin">
                    <div class="request-modal__input-data">
                        <input name="name" type="text" required class="request-modal__input" id="name">
                        <div class="request-modal__underline"></div>
                        <label for="name" class="request-modal__label">Имя</label>
                    </div>
                    <div class="request-modal__input-data">
                        <input name="login" type="text" required class="request-modal__input" id="login">
                        <div class="request-modal__underline"></div>
                        <label for="login" class="request-modal__label">Логин</label>
                    </div>
                    <div class="request-modal__input-data">
                        <input name="password" type="text" required class="request-modal__input" id="password">
                        <div class="request-modal__underline"></div>
                        <label for="password" class="request-modal__label">Пароль</label>
                    </div>
                    <div class="request-modal__input-data">
                        <input name="level" type="number" required class="request-modal__input" id="level">
                        <div class="request-modal__underline"></div>
                        <label for="level" class="request-modal__label">Уровень доступа (0, 1)</label>
                    </div>

                </section>

                <section class="request-modal__button-container request-modal__button-container_trans">
                    <button class="request-modal__cancel" id="cancel">Отмена</button>
                    <button class="request-modal__confirm" id="confirm">Сохранить</button>
                </section>
            </form>
        </div>
        `);

        return overlay;
    }

    createNewsModal = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
        <div class="request-modal">
            <form class="request-modal__form" id="requestForm">
                <section class="request-modal__input-container request-modal__input-container_admin">
                    <div class="form-group-special">
                        <div class="addimg">
                            <p class="img-overweight"></p>
                            <label for="image" class="file-label">Добавить изображение</label>
                            <input type="file" class="form-input file-input" id="image" name="image" hidden>
                        </div>
                        <div class="preview-wrapper">
                            <img class="preview" src="" alt="pic" id="preview" hidden>
                        </div>
                    </div>
                    <div class="request-modal__input-data">
                        <input name="title" type="text" required class="request-modal__input" id="title">
                        <div class="request-modal__underline"></div>
                        <label for="title" class="request-modal__label">Название</label>
                    </div>
                    
                    <div class="request-modal__input-data request-modal__input-data_textarea request-modal__input-data_textarea_admin">
                        <textarea name="text" class="request-modal__textarea request-modal__textarea_admin" required id="text"></textarea>
                         <div class="request-modal__underline request-modal__underline_textarea"></div>
                         <label for="text" class="request-modal__label">Текст</label>
                    </div>

                </section>

                <section class="request-modal__button-container request-modal__button-container_trans">
                    <button class="request-modal__cancel" id="cancel">Отмена</button>
                    <button class="request-modal__confirm" id="confirm">Сохранить</button>
                </section>
            </form>
        </div>
        `);

        return overlay;
    }

    createAdminNewsCard = (id, img, title, text) => {
        const card = document.createElement('div');
        card.classList.add('logistic__news-link');
        card.dataset.id = id;

        if (img !== 'news-img.png') {
            img = 'news-img-replace.png';
        }

        card.insertAdjacentHTML('beforeend', `
            <div class="news__news-card">
                <div class="news__news-item">
                    <img src="img/images/${img}" alt="news-img" class="news__news-img">
                        <section class="news__news-info">
                            <p class="news__news-title">${title.length > 17 ? title.substring(0, 17) + '...' : title}</p>
                            <p class="news__news-text">${text.length > 120 ? text.substring(0, 100) + '...' : text}</p>
                        </section>
                </div>
                <p class="news__news-edit">Редактировать</p>
                <p class="news__news-delete">Удалить</p>
            </div>
        `);

        return card;
    }

    createNewsAdmin = () => {
        const news = document.createElement('div');
        news.classList.add('news-admin');
        news.id = 'news-admin';

        const newsContainer = document.createElement('div');
        newsContainer.classList.add('news-container');

        const button = document.createElement('button');
        button.classList.add('news__add');
        button.classList.add('btn');
        button.innerText = 'Добавить';

        newsContainer.insertAdjacentHTML('beforeend', `
        <div class="kanban__search kanban__search_news">
                <input placeholder="Поиск..." type="text" class="kanban__input" id="searchNews">
                <button class="kanban__input-cancel" id="searchNewsCancel">Отмена</button>
            </div>
        `);

        newsContainer.prepend(button);
        newsContainer.append(news);

        return newsContainer;
    }

    createAdminPage = () => {
        const container = document.createElement('div');
        container.classList.add('container');

        container.insertAdjacentHTML('beforeend', `
    <header class="admin-header">
        <a href="index.html" class="header__logo-link admin-logo"><img src="img/icons/logo.svg" alt="logo" class="header__logo"></a>
        <h1 class="header__title_admin">ПАНЕЛЬ АДМИНИСТРАТОРА</h1>
    </header>
    <main class="admin-main">
    </main>
    <aside class="aside">
        <ul class="aside__list">
            <a href="#kanban" class="aside__link"><li class="aside__item">Заявки</li></a>
            <a href="#price" class="aside__link"><li class="aside__item">Цена</li></a>
            <a href="#news-admin" class="aside__link"><li class="aside__item">Новости</li></a>
            <a href="#admins" class="aside__link"><li class="aside__item">Админ.</li></a>
        </ul>
    </aside>
        `);

        return container;
    }

    createBrandsModal = (category, img) => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.insertAdjacentHTML('beforeend', `
          <div class="brands">
        <section class="brands__header">
            <h2 class="brands__category">${category}</h2>
            <button class="brands__cross">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9287 17.9304C17.3032 18.5543 16.2896 18.5543 15.6633 17.9304L9.99961 12.2675L4.33593 17.9304C3.71037 18.5543 2.69603 18.5543 2.07047 17.9304C1.4449 17.2985 1.4449 16.2907 2.07047 15.6589L7.73414 9.99595L2.07047 4.33312C1.4449 3.70925 1.4449 2.69339 2.07047 2.06951C2.69603 1.44564 3.71037 1.44564 4.33593 2.06951L9.99961 7.73244L15.6633 2.06951C16.2896 1.44564 17.3032 1.44564 17.9287 2.06951C18.5551 2.69339 18.5551 3.70925 17.9287 4.33312L12.2651 9.99595L17.9287 15.6589C18.5551 16.2907 18.5551 17.2985 17.9287 17.9304ZM14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312581 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z" fill="#F5F5F5"/>
                </svg>
            </button>
        </section>
        <div class="brands__img-container">
            <img src="img/images/${img}" alt="brands" class="brand__img">
        </div>
    </div>
        `);
        return overlay;
    }
}



