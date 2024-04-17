/**
 * i18n国际化配置初始化
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// 检测当前浏览器的语言或者从服务器获取配置资源,不过也没有什么用处
import Backend from "i18next-http-backend";
// 嗅探当前浏览器语言
import LanguageDetector from "i18next-browser-languagedetector";
import I18nConfig from '@/config/i18nConfig';
import zhCNLocale from "./modules/zh-CN.json";
import enUSLocale from "./modules/en-US.json";
import zhTWLocale from "./modules/zh-TW.json";
import zhCN from 'antd/es/locale/zh_CN'; // antd国际化翻译文件
import zhTW from 'antd/es/locale/zh_TW';
import enUS from 'antd/es/locale/en_US'; // antd国际化翻译文件
import { getLocale } from "@/utils/i18n";

export const initI18n = () => {
  console.log("===================I18nConfig.i18nDef=", I18nConfig.i18nDef);
  console.log("===================getLocale()=", getLocale());
  // @ts-ignore
  i18n
    .use(Backend)
    .use(LanguageDetector) // 检测用户当前使用的语言
    .use(initReactI18next) // 注入 react-i18next 实例
    .init({
      resources: {
        [I18nConfig.i18nEnum.ZHCN.value]: {
          translation: {
            ...zhCNLocale,
            ...zhCN
          }
        },
        [I18nConfig.i18nEnum.ENUS.value]: {
          translation: {
            ...enUSLocale,
            ...enUS
          }
        },
        [I18nConfig.i18nEnum.ZHTW.value]: {
          translation: {
            ...zhTWLocale,
            ...zhTW
          }
        }
      },
      fallbackLng: getLocale() || I18nConfig.i18nDef, // 备选语言。
      lng: getLocale() || I18nConfig.i18nDef, // 当前语言
      preload: I18nConfig.i18nKeyArr, // 需要预加载的语言列表
      debug: true,
      interpolation: {
        escapeValue: false, // 设置了插值选项，escapeValue: false表示不对插值的值进行HTML转义。
      },
      detection: ["localStorage", "sessionStorage", "cookie"], // 定义了语言检测的顺序，这里使用了本地存储、会话存储和cookie。
    })
};
