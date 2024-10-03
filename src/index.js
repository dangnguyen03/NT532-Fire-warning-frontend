import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {persistor, store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

// Nếu bạn muốn bắt đầu đo lường hiệu suất trong ứng dụng của mình, truyền một hàm
// để ghi lại kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm cuối phân tích. Tìm hiểu thêm tại: https://bit.ly/CRA-vitals