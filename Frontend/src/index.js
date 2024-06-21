import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/index'
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './Hooks/CartHook';
import LoadingProvider from './Hooks/LoadingHook';
import 'react-toastify/ReactToastify.css'
import { AuthProvider } from './Hooks/UseAuthHook';
import { ToastContainer } from 'react-toastify';
import './Interceptor/authinterceptor'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       
        <BrowserRouter>
        <AuthProvider>
        <LoadingProvider>
        <CartProvider>
            <App/>
            <ToastContainer 
            position='bottom-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
             rtl={false}
            pauseOnFocusLoss 
            draggable
            pauseOnHover
            theme='light'/>
            
           </CartProvider>
           </LoadingProvider>
           </AuthProvider>
            </BrowserRouter>
           
    </React.StrictMode>
);