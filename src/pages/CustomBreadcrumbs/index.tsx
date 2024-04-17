import { Card } from 'antd';
import locales from './locales';
import { useAppSelector } from '@/stores';
// import { currentI18nSelector } from '@/stores/features/i18nSlice';
import { useTranslation } from "react-i18next";

function App() {
  // const t = useAppSelector(currentI18nSelector(locales));
  const { t } = useTranslation();
  return (
    <div className='layout-main-conent'>
      <Card>
        <span style={{ fontSize: '35px', color: '#FF0000' }}>↑</span>
        {t('page.custom-breadcrumbs.msg')}
      </Card>
    </div>
  );
}

export default App;
