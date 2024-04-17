import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import settings from '@/config/settings';

import { Theme, NavMode } from '@/@types/settings.d';
import { TabNavItem } from '@/@types/router.d';
import { RootState } from '..';

export interface CurrentGlobal {
  /* 以下是针对所有 Layout 扩展字段 */
  // 左侧展开收起
  collapsed: boolean;
  // 头部固定开启
  headFixed: boolean;
  // 模板主题
  theme: Theme;
  // 左侧侧边固定开启
  leftSiderFixed: boolean;

  /* 以下是针对 UniversalLayout 扩展字段 */
  // tab菜单开启
  tabNavEnable: boolean;
  // 头部tab导航列表
  headTabNavList: TabNavItem[];
  // 菜单栏模式
  navMode: NavMode;
}

const initialState: CurrentGlobal = {
  collapsed: false,
  headFixed: settings.headFixed,
  theme: settings.theme,
  leftSiderFixed: settings.leftSiderFixed,
  tabNavEnable: settings.tabNavEnable,
  headTabNavList: [],
  navMode: settings.navMode,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState: initialState,
	reducers: {
		setGlobal: (state: CurrentGlobal, action: PayloadAction<Partial<CurrentGlobal>>) => {
			const { payload } = action;
			if (typeof payload === 'object') {
        Object.keys(payload).forEach((key: string) => {
          // @ts-ignore
          state[key] = payload[key];
        });
      }
		}
	}
});

// 导出actions
export const { setGlobal } = globalSlice.actions;

// 导出selector
export const globalSelector = (state: RootState) => state.global;

// 导出reducer
export default globalSlice.reducer;