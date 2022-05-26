import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
});

const walletconnect = new WalletConnectConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
    rpcUrl: `https://mainnet.infura.io/v3/59c1b072fbfb4b32adb7a6f332267f4d`,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
});

// const walletlink = new WalletLinkConnector({
//     url: `https://mainnet.infura.io/v3/27e484dcd9e3efcfd25a83a78777cdf1`,
//     appName: 'web3-react-demo',
// });

export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
    // coinbaseWallet: walletlink,
};
