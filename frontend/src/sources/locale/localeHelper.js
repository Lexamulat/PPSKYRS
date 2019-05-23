import _ from 'lodash';
import en from './en';

export const LOCALES = {
    EN: 'en',
};

export function initLocale() {
    window.loc = loc;
    window.__changeLocale = changeLocale;
    window.localeMap = {
        en,
    };

    const translations = getLocaleFromStorage();

    window.locale = translations ? translations : LOCALES.EN;
}

function getLocaleFromStorage() {
    return localStorage.getItem('translations');
}


function loc(key) {
    return _.get(window.localeMap, `${window.locale}.${key}`, '');
}

export function injectToLocaleMap(localeData) {
    const {locale, localeNode, localeCode} = localeData;

    if (localeNode)
        _.set(window.localeMap, `${localeCode}.${localeNode}`, locale);
    else
        window.localeMap[localeCode] = {
            ...window.localeMap[localeCode],
            ...locale
        };
}

export function changeLocale(localeCode) {
    window.locale = localeCode;
    localStorage.setItem('translations', localeCode);

}

