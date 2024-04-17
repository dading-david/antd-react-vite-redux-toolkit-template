import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocale, defaultLang } from '@/utils/i18n';
import { I18n, I18nKey, I18nVal } from '@/@types/i18n.d';

// import { createSelector } from 'reselect';

// // 导入 全局自定义 语言
// import globalLocales from '@/locales';

// 导入 antd 语言
import zhCN from 'antd/es/locale/zh_CN';
import zhTW from 'antd/es/locale/zh_TW';
import enUS from 'antd/es/locale/en_US';
import { RootState } from "..";

export interface CurrentI18n {
  i18nLocale: I18nKey,
  // i18nMessages: I18n
};

// antd 语言包
export const antdMessages: { [key in I18nKey]: any } = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS,
};

// 当前的语言
const sysLocale = getLocale();

export const initialState: CurrentI18n = {
  i18nLocale: antdMessages[sysLocale] ? sysLocale : defaultLang,
  // i18nMessages: { ...globalLocales }
}

export const i18nLocaleSlice = createSlice({
  name: 'i18n',
  initialState: initialState,
  reducers: {
    // 设置当前本地语言
    setI18nLocale: (state: CurrentI18n, action: PayloadAction<Partial<CurrentI18n>>) => {
      const { payload } = action;
      state.i18nLocale = payload.i18nLocale as I18nKey;
    }
  }
});

// 导出actions
export const { setI18nLocale } = i18nLocaleSlice.actions;

export const i18nSelector = (state: RootState) => state.i18n;

// 获取当前语言的key
export const i18nLocaleSelector = (state: RootState) => state.i18n.i18nLocale;

// 获antd 对应当前语言的内容
export const antdMessageSelector = (state: RootState) => antdMessages[state.i18n.i18nLocale];

// // 自定义语言 对应当前语言的的内容
// export const currentI18nSelector = (locales: I18n) => (state: RootState) => {
//   const i18nLocale = state.i18n.i18nLocale;
//   const i18nMessage = state.i18n.i18nMessages[i18nLocale] || {};
//   const locale = locales[i18nLocale] || {};
//   return (key: string) => i18nMessage[key] || locale[key] || key;
// }


// 导出reducer
export default i18nLocaleSlice.reducer;
