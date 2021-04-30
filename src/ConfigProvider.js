import React, {useState} from "react";
import {IntlProvider} from "react-intl";
import Sinhala from '../src/lang/sn.json';
import English from '../src/lang/en.json';

export const Context = React.createContext();

const localeLan = navigator.language
let menuKey = '1'
let language;

if (localeLan === 'en-US') {
    language = English
} else {
    language = Sinhala
}


const ConfigProvider = (props) => {
    const [locale, setLocale] = useState(localeLan);
    const [messages, setMessages] = useState(language);
    const [sideMenuKey, setSideMenu] = useState(menuKey);

    function setMenuKey(key) {
        setSideMenu(key);
    }

    function selectLang(lan) {
        const newLocale = lan;
        setLocale(newLocale);
        if (newLocale === 'sn') {
            setMessages(Sinhala);
        } else {
            setMessages(English);
        }
    }

    return (
        <Context.Provider value={{locale, selectLang, setMenuKey, sideMenuKey}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    )
}

export default ConfigProvider;