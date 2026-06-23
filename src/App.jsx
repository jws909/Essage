import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { Routes, Route } from 'react-router';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import PostWritePage from './pages/PostWritePage'
import MyPage from './pages/MyPage';
import Footer from './components/Footer';


function App() {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <NavigationBar />

      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1 container py-4 py-sm-5" style={{ marginTop: '60px' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/detail/:id' element={<PostDetailPage />} />
            <Route path='/write' element={<PostWritePage />} />
            <Route path='/mypage' element={<MyPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
