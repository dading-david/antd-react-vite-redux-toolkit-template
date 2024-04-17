import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';

import locales from './locales';

import useTitle from '@/hooks/useTitle';

import SelectLang from '@/components/SelectLang';

import { formatRoutes } from '@/utils/router';

import layoutRotes from './routes';

import './css/index.less';
import { useAppSelector } from '@/stores';
// import { currentI18nSelector } from '@/stores/features/i18nSlice';
import { useTranslation } from "react-i18next";

export interface UserLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UserLayoutProps) => {
  const location = useLocation();

  // const t = useAppSelector(currentI18nSelector(locales));
  const { t } = useTranslation();

  // 框架所有菜单路由 与 patch key格式的所有菜单路由
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // 当前路由item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // 设置title
  useTitle(t(routeItem?.meta?.title || ''));

  return (
    <div className='user-layout'>
      <div className='lang'>
        <SelectLang />
      </div>
      {/* <Outlet /> */}
      {children}
    </div>
  );
});
