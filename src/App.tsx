import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NoPage from './pages/NoPage';
import HomePage from './pages/HomePage/HomePage';
import { Header } from './components/layout';

const publicMenu: Menu = [
  { label: 'Home page', path: '/' },
  { label: 'Booking history', path: '/booking-history' },
];

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Header menu={publicMenu} collapseWidth={720} />}
          >
            <Route index element={<HomePage />} />
            <Route path="/booking-history" element={<HomePage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
