import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { formatRoutes, getBreadcrumbRoutes } from '@/utils/router';

import Permission from '@/components/Permission';
import LeftSider from './components/LeftSider';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import layoutRotes from './routes';

import useTitle from '@/hooks/useTitle';

import './css/index.less';
import { useAppSelector } from '@/stores';
import { globalSelector } from '@/stores/features/globalSlice';
import { userSelector } from '@/stores/features/userSlice';
import { useTranslation } from "react-i18next";

export interface UniversalLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UniversalLayoutProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const global = useAppSelector(globalSelector);
  const user = useAppSelector(userSelector);

  // 框架所有菜单路由 与 patch key格式的所有菜单路由
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // 当前路由item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // 面包屑导航
  const breadCrumbs = useMemo(
    () =>
      getBreadcrumbRoutes(location.pathname, routerPathKeyRouter.pathKeyRouter).map((item) => ({
        ...item,
        title: t(item.title),
      })),
    [location, routerPathKeyRouter, t],
  );

  // 设置title
  useTitle(t(routeItem?.meta?.title || ''));

  return (
    <div id='universallayout' className={classnames({ light: global.theme === 'light' })}>
      {global.navMode === 'inline' && (
        <LeftSider
          collapsed={global.collapsed}
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          routeItem={routeItem}
          theme={global.theme}
          leftSiderFixed={global.leftSiderFixed}
        />
      )}
      <div id='universallayout-right'>
        <RightTop
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          jsonMenuData={routerPathKeyRouter.pathKeyRouter}
          routeItem={routeItem}
          breadCrumbs={breadCrumbs}
        />
        <div id='universallayout-right-main'>
          <Permission role={routeItem?.meta?.roles}>
            {/* <Outlet /> */}
            {children}
          </Permission>
          <RightFooter />
        </div>
      </div>
    </div>
  );
});
