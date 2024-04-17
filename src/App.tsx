import { memo, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { setHtmlLang } from '@/utils/i18n';
import Routes from '@/config/routes';
import { useAppSelector } from './stores';
import { antdMessageSelector, i18nLocaleSelector } from './stores/features/i18nSlice';

export default memo(() => {

  const i18nLocale = useAppSelector(i18nLocaleSelector);

  const antdMessage = useAppSelector(antdMessageSelector);

  useEffect(() => {
    setHtmlLang(i18nLocale);
  }, []);

  return (
    <ConfigProvider locale={antdMessage}>
      <Routes />
    </ConfigProvider>
  );
});
