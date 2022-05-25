import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WalletContext } from '../../../contexts/WalletContext';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import ConnectWallet from '../../ConnectWallet';
import images from '../../../assets/images';
const cx = classNames.bind(styles);

export default function Header() {
    const { network } = useContext(WalletContext);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('toggle')}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                    </div>
                    <Link to={'/'}>
                        <img className={cx('logo')} src={images.logo} alt="Logo Air Class" />
                    </Link>
                </div>
                <div className={cx('right')}>
                    <div className={cx('menu')}>
                        <div className={cx('item', { active: true })}>
                            <span>My bag</span>
                        </div>
                        <div className={cx('item')}>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                className={cx('menu-icon')}
                                height="2em"
                                width="2em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 22c3.976 0 8-1.374 8-4V6c0-2.626-4.024-4-8-4S4 3.374 4 6v12c0 2.626 4.024 4 8 4zm0-2c-3.722 0-6-1.295-6-2v-1.268C7.541 17.57 9.777 18 12 18s4.459-.43 6-1.268V18c0 .705-2.278 2-6 2zm0-16c3.722 0 6 1.295 6 2s-2.278 2-6 2-6-1.295-6-2 2.278-2 6-2zM6 8.732C7.541 9.57 9.777 10 12 10s4.459-.43 6-1.268V10c0 .705-2.278 2-6 2s-6-1.295-6-2V8.732zm0 4C7.541 13.57 9.777 14 12 14s4.459-.43 6-1.268V14c0 .705-2.278 2-6 2s-6-1.295-6-2v-1.268z"></path>
                            </svg>
                            <span>Token</span>
                        </div>
                        <Link className={cx('item')} to="/mynft">
                            <svg
                                className={cx('menu-icon')}
                                fill="currentColor"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="ArticleIcon"
                                height="2.4em"
                                width="2.4em"
                            >
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
                            </svg>
                            <span>My NFT</span>
                        </Link>
                    </div>

                    <Link className={cx('quest')} to="/quest">
                        Quest
                    </Link>

                    <Link className={cx('user')} to="/profile">
                        <img src={images.user} alt="" />
                    </Link>

                    <div className={cx('dot')}></div>
                    <p className={cx('network', { err: network === undefined })}>
                        {network === undefined ? 'Wrong network' : network}
                    </p>

                    <ConnectWallet />
                </div>
            </div>
        </header>
    );
}
