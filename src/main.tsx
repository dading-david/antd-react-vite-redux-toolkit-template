import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter /* , HashRouter */ } from 'react-router-dom';

// Register icon sprite
import 'virtual:svg-icons-register';
// 全局css
import '@/assets/css/index.less';
// App
import App from '@/App';
import { initI18n } from './i18n';
import store from './stores';

// 可伸缩布局库，计算并设置根元素的px，如果不使用此插件，也可自定义监听窗口size的改变，动态设置根元素的px大小
// import 'amfe-flexible';


// 初始化i18n
initI18n();

// 挂载
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
