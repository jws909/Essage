import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import PostWritePage from './pages/PostWritePage'

function App() {
  const [ count, setCount ] = useState(0)

  let navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" expand="md" className="px-4 py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand onClick={() => { navigate("/") }} className="fw-bold text-uppercase">
            Essage</Navbar.Brand>
          <Nav className="me-auto" className="d-none d-md-flex gap-3">
            <Nav.Link onClick={() => { navigate("/") }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate("/calendar") }}>일정</Nav.Link>
            <Nav.Link onClick={() => { navigate("/mypage") }}>마이페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate("/archive") }}>자료실</Nav.Link>
            <Nav.Link onClick={() => { navigate("/write") }}><Button variant="primary">글쓰기</Button></Nav.Link>
            <Nav.Link onClick={() => { navigate("/mypage") }}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail/:id' element={<PostDetailPage />} />
        <Route path='/write' element={<PostWritePage />} />
      </Routes>
    </>
  )
}

export default App
