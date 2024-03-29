import React from 'react';
import {createRoot} from "react-dom/client";
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "./utils/stripe/stripe";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    {/*<UserProvider>*/}
                    {/*<CategoriesProvider>*/}
                    {/*    <CartProvider>*/}
                    <Elements stripe={stripePromise}>
                        <App />
                    </Elements>

                    {/*</CartProvider>*/}
                    {/*</CategoriesProvider>*/}
                    {/*</UserProvider>*/}
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);


