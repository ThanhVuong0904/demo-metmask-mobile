import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import GlobalStyles from './components/GlobalStyles';
import WalletContextProvider from './contexts/WalletContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
function getLibrary(provider) {
    console.log(provider);
    return new Web3(provider);
}
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <WalletContextProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </WalletContextProvider>
        ,
    </Web3ReactProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
