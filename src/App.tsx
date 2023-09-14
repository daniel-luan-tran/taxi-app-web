import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NoPage from './pages/NoPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' 
          // element={<Layout />}
          >
            <Route index element={<HomePage />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
