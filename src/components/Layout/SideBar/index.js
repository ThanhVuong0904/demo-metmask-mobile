import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import images from '../../../assets/images';
import SideBarItem from './SideBarItem';
const cx = classNames.bind(styles);

const NAVS = [
    { name: 'Exchange', icon: images.exchange },
    {
        name: 'Earn',
        icon: images.earn,
        children: [
            { name: 'Liquidity', desc: 'Provide liquidity to earn trading fees', icon: images.nav },
            { name: 'Mining', desc: 'Stake LP to earn token rewards', icon: images.nav },
        ],
    },
    { name: 'Crowpooling', icon: images.crowpooling },
    {
        name: 'Tools',
        icon: images.tool,
        children: [
            {
                name: 'CreateAToken',
                desc: 'Create your own tokens with one click. No coding required!',
                icon: images.nav,
            },
            {
                name: 'Pools',
                desc: 'Create and manage liquidity markets and customize your market making strategies',
                icon: images.nav,
            },
            {
                name: 'CreateCrowdpooling',
                desc: 'Equal opportunity token distribution with community-built pools',
                icon: images.nav,
            },
            {
                name: 'CreateLiquidity',
                desc: 'Mining rewards creation for project teams to incentivize LPs or create native token staking',
                icon: images.nav,
            },
        ],
    },
    {
        name: 'Metatime',
        icon: images.metatime,
        children: [
            { name: 'METATIME', desc: 'Create your own tokens with one click. No coding required!', icon: images.nav },
            {
                name: 'Time Staking',
                desc: 'Create and manage liquidity markets and customize your market making strategies',
                icon: images.nav,
            },
            {
                name: 'Time Vesting',
                desc: 'Equal opportunity token distribution with community-built pools',
                icon: images.nav,
            },
        ],
    },
    {
        name: 'NFT',
        icon: images.nft,
        children: [
            { name: 'Trade NFT', desc: 'Explore and Trade NFT Fragments', icon: images.nav },
            { name: 'Fragments', desc: 'Create and Issue Fragments for Your NFTs', icon: images.nav },
            { name: 'CreateNFT', desc: 'Upload Your Media files and Create NFTs with One Click', icon: images.nav },
            { name: 'Pick Avatar', desc: 'Pick Avatar', icon: images.nav },
            { name: 'Money-hungry Dino', desc: 'Money-hungry Dino', icon: images.nav },
            { name: 'NFT Market', desc: 'NFT Market', icon: images.nav },
        ],
    },
    {
        name: 'Governance',
        icon: images.governance,
        children: [{ name: 'Voting', desc: 'Propose and vote on DIPs', icon: images.nav }],
    },
    {
        name: 'Bridge',
        icon: images.bridge,
        children: [
            { name: 'ArbitrumBridge', desc: 'Arbitrum Official Bridge', icon: images.arbitrum },
            { name: 'BSCBridge', desc: 'BSC Official Bridge', icon: images.binance },
            { name: 'cBridge', desc: 'Powered by Celer Network', icon: images.cbridge },
        ],
    },
];

export default function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                {NAVS && NAVS.map((nav, index) => <SideBarItem key={index} data={nav} />)}
            </div>
        </aside>
    );
}
