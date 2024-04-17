import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import locales from '../locales';

import { removeToken } from '@/utils/localToken';

import IconSvg from '@/components/IconSvg';
import { useAppDispatch, useAppSelector } from '@/stores';
import { userSelector, setUser, initialState } from '@/stores/features/userSlice';
// import { currentI18nSelector } from '@/stores/features/i18nSlice';
import { useTranslation } from "react-i18next";

export default memo(() => {
  // const t = useAppSelector(currentI18nSelector(locales));
  const { t } = useTranslation();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        dispatch(setUser({
          ...user,
          ...initialState,
        }))
        removeToken();
        navigate('/user/login', {
          replace: true,
        });
      }
    },
    [user, setUser],
  );
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={onMenuClick}
          items={[
            {
              key: 'userinfo',
              label: <>{t('universal-layout.topmenu.userinfo')}</>,
            },
            {
              key: 'logout',
              label: <>{t('universal-layout.topmenu.logout')}</>,
            },
          ]}
        />
      }
    >
      <a className='universallayout-top-usermenu ant-dropdown-link' onClick={(e) => e.preventDefault()}>
        {user.name}
        <IconSvg name='arrow-down' />
      </a>
    </Dropdown>
  );
});
