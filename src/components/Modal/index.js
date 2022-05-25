import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

export default function Modal({ children, onClick }) {
    return (
        <div className={cx('modalBackground')}>
            <div className={cx('modalContainer')}>
                <div className={cx('title-closeBtn')} onClick={onClick}>
                    <span>X</span>
                </div>
                {children}
            </div>
        </div>
    );
}
