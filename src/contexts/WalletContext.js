import { createContext, useEffect, useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

export const WalletContext = createContext();

function WalletContextProvider({ children }) {
    const { active, activate, deactivate, chainId, error } = useWeb3React();
    const [web3, setWeb3] = useState();
    const [provider, setProvider] = useState();
    const [balance, setBalance] = useState();
    const [network, setNetwork] = useState();
    const [account, setAccount] = useState();
    const injected = new InjectedConnector({
        //chain is network blockchain
        // 4 rinkeby
        // 97 bsc testnet
        // 0x13881 mumbai
        supportedChainIds: [4, 97, 80001],
    });
    function isMobileDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }
    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const web3 = new Web3(provider);
                setWeb3(web3);
                setProvider(provider);
                const chainId = await provider.request({
                    method: 'eth_chainId',
                });
                console.log({ chainId });
            } else {
                alert('Install metamask');
            }
        };
        loadProvider();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getBalance = async () => {
            const balance = await web3.eth.getBalance(account);
            setBalance(balance);
        };
        account && getBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                try {
                    await activate(injected);
                    localStorage.setItem('isWalletConnected', true);
                } catch (ex) {
                    console.log(ex);
                }
            }
        };
        provider && connectWalletOnPageLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider]);
    useEffect(() => {
        console.log(error);
    }, [error]);
    useEffect(() => {
        console.log(provider);
    }, [provider]);
    useEffect(() => {
        if (chainId) {
            switch (chainId) {
                case 4:
                    return setNetwork('ETH');
                case 97:
                    return setNetwork('BSC');
                case 80001:
                    return setNetwork('MUMBAI');
                default:
                    throw new Error('Not support chain id');
            }
        }
    }, [chainId]);
    async function connect() {
        try {
            // await activate(injected);
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            setAccount(accounts[0]);
            console.log('isMobileDevice()', isMobileDevice());
            localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
            console.log(ex);
        }
    }
    useEffect(() => {
        provider &&
            provider.on('accountsChanged', (accounts) => {
                console.log(accounts);
            });
    }, [provider]);

    async function disconnect() {
        try {
            deactivate();
            localStorage.setItem('isWalletConnected', false);
            console.log({ account });
        } catch (ex) {
            console.log(ex);
        }
    }
    const switchNetwork = async () => {
        const RINKEBY_HEX_CHAIN = '0x4';
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: RINKEBY_HEX_CHAIN }],
        });
    };
    const state = {
        web3,
        balance,
        account,
        network,
        active,
        chainId,
        error,
        connect,
        disconnect,
        switchNetwork,
    };
    return <WalletContext.Provider value={state}>{children}</WalletContext.Provider>;
}
export default WalletContextProvider;
