import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ConnectWallet.module.scss';
import Modal from '../Modal';
import { WalletContext } from '../../contexts/WalletContext';

import images from '../../assets/images';

const cx = classNames.bind(styles);

const NETWORKS = [
    { name: 'Ethereum', icon: images.ethereum },
    { name: 'Binance', icon: images.binance },
    { name: 'Heco', icon: images.heco },
    { name: 'Polygon', icon: images.polygon },
    { name: 'Arbitrum', icon: images.arbitrum },
    { name: 'Moonriver', icon: images.moonriver },
    { name: 'OkChain', icon: images.okchain },
];

const WALLETS = [
    { name: 'Metamask', icon: images.metamask },
    { name: 'WalletConnect', icon: images.walletconnect },
    { name: 'CoinBase', icon: images.coinbase },
    { name: 'Portis', icon: images.portis },
];

const ACTIONS = [
    { name: 'View', icon: images.view },
    { name: 'Copy', icon: images.copy },
    { name: 'Switch', icon: images.switch },
    { name: 'Disconnect', icon: images.disconnect },
];
export default function ConnectWallet() {
    const [activeNetwork, setActiveNetwork] = useState('Ethereum');
    const [checkPolicy, setCheckPolicy] = useState(false);
    const [toggle, setToggle] = useState(false);

    const { connect, connetWallet, account, network, error, active, balance, disconnect, switchNetwork } =
        useContext(WalletContext);
    return (
        <>
            {account ? (
                <p className={cx('wrapper')} onClick={() => setToggle(true)}>
                    {account.slice(0, 4)}...{account.slice(account.length - 4, account.length)}
                </p>
            ) : (
                <>
                    {error && (
                        <p className={cx('wrapper')} onClick={() => switchNetwork()}>
                            {alert(error)}
                            Switch Network
                        </p>
                    )}
                    {!error && (
                        <p className={cx('wrapper')} onClick={() => setToggle(true)}>
                            Connect Wallet
                        </p>
                    )}
                </>
            )}

            {toggle && (
                <Modal
                    onClick={() => {
                        setToggle(false);
                        setCheckPolicy(false);
                    }}
                >
                    {/* Header */}
                    <div className={cx('modal-header')}>
                        {account ? (
                            <p className={cx('account')}>
                                {account.slice(0, 4)}...{account.slice(account.length - 4, account.length)}
                            </p>
                        ) : (
                            <p>Connect Wallet</p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className={cx('dot')}></div>
                            {network}
                        </div>
                    </div>
                    {!active ? (
                        // {/* Policy */}
                        <div className={cx('modal-policy')}>
                            <input
                                type="checkbox"
                                value={checkPolicy}
                                onChange={() => setCheckPolicy(!checkPolicy)}
                                checked={checkPolicy ? true : false}
                            />
                            <span>
                                I have read, understand, and agree to the{' '}
                                <span style={{ color: '#ffe804' }}> Terms of Service.</span>
                            </span>
                        </div>
                    ) : (
                        // Balance
                        <div className="">
                            <h3 className={cx('modal-title')}>MetaMask</h3>
                            <div className={cx('wrapper-balance')}>
                                <div className={cx('balance-item')}>
                                    <div className={cx('flex')}>
                                        <img src={images.ethereum} alt="Ethereum Icon" />
                                        <span>ETH</span>
                                    </div>
                                    <p>{(balance / 1e18).toFixed(4)}</p>
                                </div>
                                <p className={cx('dolars')}>${((balance / 1e18) * 3718.14).toFixed(3)} </p>
                            </div>
                        </div>
                    )}

                    {!active ? (
                        <div className={cx('modal-body')}>
                            <h3 className={cx('modal-title')}>Select Network</h3>
                            <div className={cx('networks')}>
                                {NETWORKS.map((network, index) => (
                                    <div
                                        key={index}
                                        className={cx('network-item', { active: activeNetwork === network.name })}
                                        onClick={() => setActiveNetwork(network.name)}
                                    >
                                        <img className={cx('network-icon')} src={network.icon} alt={network.name} />
                                        <p className={cx('network-name')}>{network.name}</p>
                                        {activeNetwork === network.name && (
                                            <img className={cx('network-check-icon')} src={images.check} alt="" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Actions
                        <div className={cx('actions')}>
                            {ACTIONS.map((action, index) => (
                                <div
                                    key={index}
                                    className={cx('action-item', {
                                        switch: action.name === 'Switch',
                                        disconnect: action.name === 'Disconnect',
                                    })}
                                    onClick={() => {
                                        if (action.name === 'Disconnect') {
                                            disconnect();
                                            setToggle(false);
                                        }
                                    }}
                                >
                                    <img src={action.icon} alt={action.name} className={cx('action-icon')} />
                                    <p className={cx('action-name')}>{action.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={cx('modal-footer')}>
                        {!active ? (
                            <>
                                <h3 className={cx('modal-title')}>Select Wallet</h3>
                                <div className={cx('wallets', { active: checkPolicy })}>
                                    {WALLETS.map((wallet, index) => (
                                        <button
                                            key={index}
                                            disabled={!checkPolicy}
                                            className={cx('wallet-item')}
                                            onClick={() => {
                                                if (wallet.name === 'Metamask') {
                                                    connect();
                                                    setToggle(false);
                                                }
                                                if (wallet.name === 'WalletConnect') {
                                                    connetWallet();
                                                }
                                            }}
                                        >
                                            <img className={cx('wallet-icon')} src={wallet.icon} alt={wallet.name} />
                                            <p className={cx('wallet-name')}>{wallet.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className={cx('buy-crypto')}>Buy Crypto</h3>
                                <div className={cx('crypto')}>
                                    <img src={images.crypto} alt="" />
                                    <p>Transak</p>
                                </div>
                                <div className={cx('recent')}>
                                    <h3 className={cx('buy-crypto')}>Recent Transactions</h3>
                                    <div>
                                        <img src={images.clear} alt="" />
                                        <p>Clear all</p>
                                    </div>
                                </div>
                                <p className={cx('noti')}>No results found</p>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}
