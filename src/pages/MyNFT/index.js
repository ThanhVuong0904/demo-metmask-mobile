import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './MyNFT.module.scss';
import { WalletContext } from '../../contexts/WalletContext';
import images from '../../assets/images';
const cx = classNames.bind(styles);

export default function MyNFT() {
    const { account, chainId } = useContext(WalletContext);
    const [NFTs, setNFTs] = useState([]);
    const [network, setNetwork] = useState('');
    useEffect(() => {
        if (chainId === 4) {
            setNetwork('rinkeby');
        }
        if (chainId === 97) {
            setNetwork('bsc');
        }
        if (chainId === 80001) {
            setNetwork('testnet');
        }
    }, [chainId]);
    useEffect(() => {
        console.log('chain id', chainId);
    }, [chainId]);
    useEffect(() => {
        const getNFTs = async () => {
            const res = await axios.get(`https://api-nft.airclass.io/nft/${account}/${network}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
            setNFTs(res.data.nft);
        };
        account && getNFTs();
    }, [account, network]);
    useEffect(() => {
        if (!account) {
            setNFTs([]);
        }
    }, [account]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>My NFT</h1>
                <div className={cx('tabs')}>
                    <div className={cx('tab-item', { active: true })}>Socialfi</div>
                    <div className={cx('tab-item')}>Defi</div>
                    <div className={cx('tab-item')}>Gamefi</div>
                </div>
            </div>

            <div className={cx('inner')}>
                {NFTs.length === 0 && (
                    <div className={cx('no-data')}>
                        <img src={images.egg} alt="egg" />
                        <p>No Data</p>
                    </div>
                )}
                <div className={cx('nfts')}>
                    {NFTs.map((nft, index) => {
                        const metadata = nft.metadata && JSON.parse(nft.metadata);
                        return (
                            <div className={cx('nft')} key={index}>
                                {metadata && metadata.image ? (
                                    <div className={cx('nft-image')}>
                                        <img src={metadata.image} alt={metadata.name} />
                                    </div>
                                ) : (
                                    <div className={cx('nft-image')}>
                                        <img src={images.error} alt={images.error} />
                                    </div>
                                )}
                                {metadata && <p className={cx('nft-name')}>{metadata.name}</p>}
                                {metadata && <p className={cx('nft-amount')}>Amount {nft.amount}</p>}
                                {/* Redirect */}
                                <a href="https://marketplace.airclass.io/">URl: </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
