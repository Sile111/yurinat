export class RegExp {
    names = elem => {
        const value = elem.value;
        elem.value = value.replace(/[^а-яА-ЯёЁa]+$/, '');
    }
    phones = elem => {
        const value = elem.value;
        elem.value = value.replace(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{12}$/, '');
    }
    inns = elem => {
        const value = elem.value;
        elem.value = value.replace(/^\d{13}$/, '');
    }
    amounts = elem => {
        const value = elem.value;
        elem.value = value.replace(/^[а-яА-ЯёЁ0-9\s]+$/, '');
    }
    indexes = elem => {
        const value = elem.value;
        elem.value = value.replace(/^\d{7}$/, '');
    }
    sizes = elem => {
        const value = elem.value;
        elem.value = value.replace(/^\d{20}$/, '');
    }
    weights = elem => {
        const value = elem.value;
        elem.value = value.replace(/^\d{15}$/, '');
    }
    emails = elem => {
        const value = elem.value;
        elem.value = value.replace(/^\S\z/, '');
    }
}