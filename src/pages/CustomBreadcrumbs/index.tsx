import { Card } from 'antd';
import { useTranslation } from "react-i18next";

function App() {
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
