import React,{useState} from "react";
import {IntlProvider} from "react-intl";
import Sinhala from '../src/lang/sn.json';
import English from '../src/lang/en.json';

export const Context = React.createContext();

const localeLan = navigator.language

let language;
if(localeLan === 'en-US'){
    language=English
} else {
    language=Sinhala
}

const ConfigProvider = (props)=>{
    const [locale,setLocale] = useState(localeLan);
    const [messages,setMessages] = useState(language);

   function selectLang(lan)  {
       console.log(lan)
       const newLocale = lan;
       setLocale(newLocale);
       if(newLocale==='sn'){
           setMessages(Sinhala);
       }else {
           setMessages(English);
       }
    }
    return(
        <Context.Provider value={{locale,selectLang}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    )
}

export default ConfigProvider;