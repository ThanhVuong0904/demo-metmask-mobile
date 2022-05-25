import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

import DefaultLayout from './components/Layout/DefaultLayout';

function App() {
    return (
        <Router>
            {/* <button onClick={connect}>Connect to MetaMask</button>
            {active ? (
                <span>
                    Connected with <b>{account}</b>
                </span>
            ) : (
                <span>Not connected</span>
            )}
            <button onClick={disconnect}>Disconnect</button> */}
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = DefaultLayout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
