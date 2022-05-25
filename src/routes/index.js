import MyNFT from '../pages/MyNFT';
import Home from '../pages/Home';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/mynft', component: MyNFT },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
