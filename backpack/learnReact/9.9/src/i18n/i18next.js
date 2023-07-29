import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh from './zh.json';
const defaultLanguage = 'zh_TW'; //默认英语


i18n
  .use(initReactI18next) //使用
  .init({ //初始化
    resources: {
      'en_US': {
        translation: en,
      },
      'zh_TW': {
        translation: zh,
      }
      // en,
      // zh
    },
    lng: localStorage.getItem('language'),
    fallbackLng: localStorage.getItem('language') === null ? defaultLanguage : localStorage.getItem('language'),
    interpolation: {
      escapeValue: false,
    },

  })
  .then(t => {
  });

const changeLanguage = lng => { //定义多语言的change 
  i18n.changeLanguage(lng); //i18n会通过这个方法去改变它的语言
};

export { changeLanguage }; //导出
