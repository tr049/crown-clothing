import React from 'react';
import {createRoot} from "react-dom/client";
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store/store";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/*<UserProvider>*/}
                    {/*<CategoriesProvider>*/}
                    {/*    <CartProvider>*/}
                            <App />
                        {/*</CartProvider>*/}
                    {/*</CategoriesProvider>*/}
                {/*</UserProvider>*/}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


