import '../css/NavigationBar.css'
import { PencilSquare, ColumnsGap } from 'react-bootstrap-icons';
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import useAccountStore from '../store/useAccountStore';
import useTeamStore from '../store/useTeamStore';

import ProfileButton from './ProfileButton';
import useProfileStore from '../store/useProfileStore';

function NavigationBar() {
    let navigate = useNavigate();

    const user = useAccountStore((s) => s.user);
    const logout = useAccountStore((s) => s.logout);
    const teamId = useTeamStore((s) => s.currentTeamId);
    const getTeamsByUserEmail = useTeamStore((s) => s.getTeamsByUserEmail);
    const setCurrentTeamId = useTeamStore((s) => s.setCurrentTeamId);

    // 프로필 불러오기
    const profiles = useProfileStore((s) => s.profiles);
    const getUserProfile = useProfileStore((s) => s.getUserProfile);
    const userProfile = getUserProfile(user.email);

    const locationBase = `/teams/${teamId}`;

    const myTeams = getTeamsByUserEmail(user?.email);
    const currentTeam = myTeams.find(t => t.id === Number(teamId));

    const handleTeamChange = (nextTeamId) => {
        setCurrentTeamId(nextTeamId);
        navigate(`/teams/${nextTeamId}`);
    };

    function handleLogout() {
        logout();
        setCurrentTeamId(null);
        alert("로그아웃되었습니다.");
        navigate("/");
    }

    return (
        <Navbar fixed="top" expand="md" className="nav-bar px-4 py-1">
            <Container fluid className="nav-con">

                {/* 1. 로고 및 워크스페이스 비주얼 드롭다운 영역 */}
                <div className="d-flex align-items-center gap-3">
                    <Navbar.Brand onClick={() => { navigate(locationBase) }} className="fw-bold text-lg mb-0" style={{ cursor: 'pointer' }}>
                        <span className='text-primary'>E</span>ssage
                    </Navbar.Brand>

                    {/* 세로 구분선 */}
                    <div className="text-muted opacity-25">|</div>

                    {/* ✨ 현재 선택된 팀 비주얼 드롭다운 */}
                    {currentTeam && (
                        <Dropdown className="w-100" style={{ maxWidth: '200px' }}>
                            <Dropdown.Toggle
                                variant="undefined"
                                className="d-flex align-items-center gap-2 border rounded-3 px-3 py-1.5 small fw-semibold text-body shadow-sm nav-dropdown-toggle"
                                style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <ColumnsGap className="text-primary" size={14} />
                                    <span>{currentTeam.name}</span>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="rounded-3 shadow-sm border mt-2 py-2 w-100">
                                <Dropdown.Header
                                    className="small fw-bold text-secondary pb-2 mb-1 border-bottom text-center px-0 mx-3"
                                    style={{ fontSize: '0.75rem', letterSpacing: '0.5px', cursor: 'default' }}
                                >워크스페이스 전환</Dropdown.Header>
                                {myTeams.map(team => (
                                    <Dropdown.Item
                                        key={team.id}
                                        active={team.id === Number(teamId)}
                                        onClick={() => handleTeamChange(team.id)}
                                        className="small py-2 px-3 fw-medium text-center"
                                    >
                                        {team.name}
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    className="small text-muted py-2 px-3"
                                    onClick={() => {
                                        setCurrentTeamId(null);
                                        navigate('/select-team');
                                    }}>
                                    ← 팀 선택창으로 가기
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>

                {/* 2. 중앙 메뉴 탭 */}
                <Nav className="d-none d-lg-flex gap-4 mx-auto">
                    <Nav.Link onClick={() => { navigate(locationBase) }}>홈</Nav.Link>
                    <Nav.Link onClick={() => { navigate(locationBase + "/calendar") }}>일정</Nav.Link>
                    <Nav.Link onClick={() => {
                        if (user) {
                            navigate("/mypage");
                        } else {
                            navigate("/login");
                        }
                    }}>마이페이지</Nav.Link>
                    <Nav.Link onClick={() => { navigate(locationBase + "/archive") }}>자료실</Nav.Link>
                </Nav>

                {/* 3. 우측 회원 세션 및 글쓰기 영역 */}
                <div className="d-flex align-items-center gap-2 gap-sm-3 ms-auto">
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

                    <Button className="d-none d-md-inline-flex gap-2 write-btn"
                        variant="primary" onClick={() => { navigate(locationBase + "/write") }}>
                        <PencilSquare size={14} /> 글쓰기
                    </Button>

                    <ProfileButton size={36} userProfile={userProfile}/>
                </div>

            </Container>
        </Navbar >
    );
}

export default NavigationBar;