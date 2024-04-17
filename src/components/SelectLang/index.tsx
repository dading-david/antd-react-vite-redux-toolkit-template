import { memo, useCallback, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { setLocale } from '@/utils/i18n';

import IconSvg from '@/components/IconSvg';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { I18nKey } from '@/@types/i18n.d';
import { useAppDispatch, useAppSelector } from '@/stores';
import { i18nLocaleSelector, i18nSelector, setI18nLocale } from '@/stores/features/i18nSlice';
import { useTranslation } from 'react-i18next';

export interface SelectLangProps {
  className?: string;
}

export default memo(({ className }: SelectLangProps) => {
  const i18Info = useAppSelector(i18nSelector);
  const i18nLocale = useAppSelector(i18nLocaleSelector);
  const dispath = useAppDispatch();
  const { i18n } = useTranslation();


  const menuItems = useMemo<ItemType[]>(
    () => [
      {
        key: 'zh-CN',
        label: <> 简体中文</>,
        icon: <>🇨🇳 </>,
        disabled: i18nLocale === 'zh-CN',
      },
      {
        key: 'zh-TW',
        label: <> 繁体中文</>,
        icon: <>🇭🇰 </>,
        disabled: i18nLocale === 'zh-TW',
      },
      {
        key: 'en-US',
        label: <> English</>,
        icon: <>🇺🇸 </>,
        disabled: i18nLocale === 'en-US',
      },
    ],
    [i18nLocale],
  );

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      const lang = key as I18nKey;
      i18n.changeLanguage(lang);
      dispath(setI18nLocale({...i18Info, i18nLocale: lang}))
      setLocale(lang);
    },
    [i18nLocale, setI18nLocale],
  );
  return (
    <Dropdown className={className} overlay={<Menu onClick={onMenuClick} items={menuItems} />}>
      <span>
        <IconSvg name='language-outline' />
      </span>
    </Dropdown>
  );
});
