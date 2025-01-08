import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './scss/main.scss';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);