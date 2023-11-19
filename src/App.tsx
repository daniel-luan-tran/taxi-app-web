import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import NoPage from './pages/NoPage';
import HomePage from './pages/HomePage/HomePage';
import { Header } from './components/layout';
import LoginForm from './components/forms/login-form/LoginForm';
import { AccountDropdown } from './components/dropdowns';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BookingHistoryList } from './components/booking-history-list/BookingHistoryList';
import RequireAuth from './RequireAuth';
import BookingHistoryEdit from './pages/BookingHistoryEdit/BookingHistoryEdit';
import BookingHistoryCreate from './pages/BookingHistoryCreate/BookingHistoryCreate';

const publicMenu: Menu = [
  { label: 'Home page', path: '/' },
  { label: 'Booking history', path: '/booking-history' },
  { label: 'Account', path: '/login' },
];

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route
              path="/"
              element={
                <Header menu={publicMenu} collapseWidth={720}>
                  <AccountDropdown />
                </Header>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/booking-history"
                element={
                  <RequireAuth secured={true} redirectTo={'/login'}>
                    <BookingHistoryList />
                  </RequireAuth>
                }
              />
              <Route
                path="/booking-history/edit"
                element={
                  <RequireAuth secured={true} redirectTo={'/login'}>
                    <BookingHistoryEdit />
                  </RequireAuth>
                }
              />
              <Route
                path="/booking-history/new"
                element={
                  <RequireAuth secured={true} redirectTo={'/login'}>
                    <BookingHistoryCreate />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
