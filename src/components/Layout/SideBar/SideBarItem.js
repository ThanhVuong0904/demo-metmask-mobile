import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import images from '../../../assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function SideBarItem({ data }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cx('sidebar-item')}>
            <div className={cx('sidebar-block')} onClick={() => setOpen(!open)}>
                <div className={cx('sidebar-header')}>
                    <img className={cx('sidebar-icon')} src={data.icon} alt="" style={{ marginRight: 10 }} />
                    <p>{data.name}</p>
                    {data.children && (
                        <img
                            className={cx('dropdown')}
                            src={images.dropdown}
                            alt=""
                            style={{ transform: open === true ? 'rotate(-180deg)' : '', transition: 'all 0.2s linear' }}
                        />
                    )}
                </div>
            </div>
            {data.children &&
                data.children.map((child, index) => {
                    return (
                        <div className={cx('sidebar-block', 'child', { open })} key={index}>
                            <div className={cx('sidebar-header', 'child')}>
                                <img
                                    className={cx('sidebar-icon')}
                                    src={child.icon}
                                    alt=""
                                    style={{ marginRight: 10 }}
                                />
                                <p>{child.name}</p>
                                <img className={cx('arrow')} src={images.rightarrow} alt="" />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
