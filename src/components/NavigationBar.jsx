import '../css/NavigationBar.css'
import { Person, PencilSquare } from 'react-bootstrap-icons';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function NavigationBar() {

    let navigate = useNavigate();

    return (
        <Navbar fixed="top" bg="light" expand="md" className="bg-white border-bottom py-1 nav-bar">
            <Container fluid className="nav-con">
                <Navbar.Brand onClick={() => { navigate("/") }} className="fw-bold text-lg" style={{cursor: 'pointer'}}>
                    <span className='text-primary'>E</span>ssage</Navbar.Brand>
                <Nav className="d-none d-md-flex gap-4">
                    <Nav.Link onClick={() => { navigate("/") }}>홈</Nav.Link>
                    <Nav.Link onClick={() => { navigate("/calendar") }}>일정</Nav.Link>
                    <Nav.Link onClick={() => { navigate("/mypage") }}>마이페이지</Nav.Link>
                    <Nav.Link onClick={() => { navigate("/archive") }}>자료실</Nav.Link>
                </Nav>

                <div className="d-flex align-items-center gap-2 gap-sm-3">
                    <Button className="d-none d-sm-inline-flex gap-2 write-btn"
                        variant="primary" onClick={() => { navigate("/write") }}>
                        <PencilSquare size={16} /> 글쓰기
                    </Button>

                    <Button variant="secondary" className="rounded-circle d-flex align-items-center justify-content-center profile-btn" onClick={() => navigate("/mypage")}>
                        <Person size={20}/>
                    </Button>
                </div>

            </Container>
        </Navbar >
    );
}

export default NavigationBar;