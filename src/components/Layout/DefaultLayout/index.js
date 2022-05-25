import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../Header';
import SideBar from '../SideBar';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
