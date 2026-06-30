import '../css/NavigationBar.css'
import { Person, PencilSquare } from 'react-bootstrap-icons';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import useAccountStore from '../store/useAccountStore';
import useTeamStore from '../store/useTeamStore';

function NavigationBar() {

    let navigate = useNavigate();
    const user = useAccountStore((s) => s.user);
    const logout = useAccountStore((s) => s.logout);
    const teamId = useTeamStore((s) => s.currentTeamId);
    const location = "/teams/" + teamId;
    const setCurrentTeamId = useTeamStore((s) => s.setCurrentTeamId);

    function handleLogout() {
        logout();
        setCurrentTeamId(null);
        alert("로그아웃되었습니다.");
        navigate("/");
    }

    return (
        <Navbar fixed="top" expand="md" className="nav-bar px-4 py-1">
            <Container fluid className="nav-con">
                <Navbar.Brand onClick={() => { navigate(location + "/") }} className="fw-bold text-lg" style={{ cursor: 'pointer' }}>
                    <span className='text-primary'>E</span>ssage</Navbar.Brand>
                <Nav className="d-none d-md-flex gap-4">
                    <Nav.Link onClick={() => { navigate(location + "/") }}>홈</Nav.Link>
                    <Nav.Link onClick={() => { navigate(location + "/calendar") }}>일정</Nav.Link>
                    <Nav.Link onClick={() => {
                        if (user) {
                            navigate("/mypage");
                        } else {
                            navigate("/login");
                        }
                    }}>마이페이지</Nav.Link>
                    <Nav.Link onClick={() => { navigate(location + "/archive") }}>자료실</Nav.Link>
                </Nav>

                <div className="d-flex align-items-center gap-2 gap-sm-3">
                    {user ? (
                        <Nav.Link
                            className="d-none d-sm-inline-flex login-btn"
                            onClick={handleLogout}>
                            로그아웃
                        </Nav.Link>
                    ) : (
                        <Nav.Link
                            className="d-none d-sm-inline-flex login-btn"
                            onClick={() => { navigate("/login") }}>
                            로그인
                        </Nav.Link>
                    )}

                    <Button className="d-none d-sm-inline-flex gap-2 write-btn"
                        variant="primary" onClick={() => { navigate(location + "/write") }}>
                        <PencilSquare size={14} /> 글쓰기
                    </Button>

                    <Button variant="secondary" className="rounded-circle d-flex align-items-center justify-content-center profile-btn"
                        onClick={() => {
                            if (user) {
                                navigate("/mypage");
                            } else {
                                navigate("/login");
                            }
                        }}>
                        <Person size={20} />
                    </Button>
                </div>



            </Container>
        </Navbar >
    );
}

export default NavigationBar;