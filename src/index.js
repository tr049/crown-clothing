import React from 'react';
import {createRoot} from "react-dom/client";
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./contexts/user.context";
import {ProductsProvider} from "./contexts/products.context";
import {CartProvider} from "./contexts/cart.context";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ProductsProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);


