import { useState } from "react";
import useAccountStore from "../store/useAccountStore";
import useTeamStore from "../store/useTeamStore";
import { EmojiSmile, PeopleFill, PlusCircle, Search, ArrowRightShort } from 'react-bootstrap-icons'
import { Alert, Badge, Button, Modal, Collapse, Form } from 'react-bootstrap';
import '../css/TeamSelectPage.css'
import { useNavigate } from "react-router";
import { TEAM_CATEGORIES } from "../data/teamData";
import TeamCreateForm from "../components/TeamCreateForm";

function TeamSelectPage() {
    const navigate = useNavigate();

    const user = useAccountStore((s) => s.user);
    const createTeam = useTeamStore((s) => s.createTeam);
    const getTeamsByUserEmail = useTeamStore((s) => s.getTeamsByUserEmail);
    const setCurrentTeamId = useTeamStore((s) => s.setCurrentTeamId);
    const addMemberToTeam = useTeamStore((s) => s.addMemberToTeam);

    const allTeams = useTeamStore((s) => s.teams) || [];
    const myTeams = getTeamsByUserEmail(user?.email) || [];

    // 내가 아직 가입하지 않은 "참여 가능한 다른 팀 목록" 필터링
    const availableTeams = allTeams.filter(team => !team.members.includes(user?.email));

    // 팀 참여 모달 열림/닫힘 상태 관리
    const [ showJoinModal, setShowJoinModal ] = useState(false);

    // 컴포넌트 내부에 상태 추가
    const [ showCreateForm, setShowCreateForm ] = useState(false);
    // 컴포넌트로 내릴 생성 로직 핸들러
    const handleCreateTeamSubmit = (name, category, desc) => {
        // 전역 스토어 액션 실행
        createTeam(name, user.email, category, desc);

        // 최신 ID 확보 및 자동 입장
        const activeTeamId = useTeamStore.getState().currentTeamId;
        alert(`'${name}' 워크스페이스가 성공적으로 개설되었습니다!`);
        navigate(`/teams/${activeTeamId}`);
    };

    function handleTeamClick(id) {
        setCurrentTeamId(id);
        navigate("/teams/" + id);
    }

    // 팀 생성
    const handleCreateTeamFlow = () => {
        const newTeamName = prompt("새로 개설할 팀(워크스페이스) 이름을 입력하세요:");
        if (!newTeamName || !newTeamName.trim()) return;

        // 카테고리 선택 유도 (간이 prompt 방식 또는 고정 기본값 처리)
        const categoryListStr = TEAM_CATEGORIES.join(", "); // Dev, Design, Marketing, Business
        const selectedCategory = prompt(`카테고리를 입력하세요 (${categoryListStr}):`, "Dev");

        // 입력값이 리스트에 없으면 기본값 "Dev" 적용
        const finalCategory = TEAM_CATEGORIES.includes(selectedCategory) ? selectedCategory : "Dev";

        const newDesc = prompt("팀에 대한 간단한 설명을 입력하세요 (생략 가능):");

        // 1. 스토어 로직 확장 버전으로 실행
        createTeam(newTeamName.trim(), user.email, finalCategory, newDesc?.trim());

        // 2. 최신 ID 확보 및 자동 입장
        const activeTeamId = useTeamStore.getState().currentTeamId;
        alert(`'${newTeamName}' 워크스페이스가 성공적으로 개설되었습니다!`);
        navigate(`/teams/${activeTeamId}`);
    };

    // 모달 내부에서 특정 팀을 클릭했을 때 작동하는 가입 핸들러
    const handleSelectTeamToJoin = (targetTeam) => {
        const isConfirm = window.confirm(`'${targetTeam.name}' 워크스페이스에 참여하시겠습니까?`);

        if (isConfirm) {
            addMemberToTeam(targetTeam.id, user.email);
            setCurrentTeamId(targetTeam.id);

            setShowJoinModal(false); // 모달 닫기
            alert(`'${targetTeam.name}' 워크스페이스에 성공적으로 가입되었습니다!`);
            navigate(`/teams/${targetTeam.id}`);
        }
    };

    // [존재하는 팀 탐색 및 참여] 버튼 클릭 시 호출
    const handleOpenJoinModal = () => {
        if (availableTeams.length === 0) {
            alert("현재 가입 가능한 새로운 팀이 없습니다. 모든 팀에 이미 참여 중이거나 등록된 팀이 없습니다.");
            return;
        }
        setShowJoinModal(true);
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>

                <div className="w-100 mb-5" style={{ maxWidth: "600px" }}>
                    <Alert
                        variant="info"
                        className="d-flex align-items-start align-items-sm-center gap-3 rounded-4 px-4 py-3 mb-0"
                        role="status"
                        style={{ border: "none", backgroundColor: "#e6f7ff" }}
                    >
                        <EmojiSmile
                            className="flex-shrink-0 mt-1 mt-sm-0 text-primary"
                            style={{ width: '20px', height: '20px' }}
                        />

                        <p className="mb-0 small fw-medium text-dark">
                            <span className="fw-bold text-primary">[Welcome] </span>
                            반가워요, <span className="fw-bold">{user?.name}</span>님! 오늘 협업할 워크스페이스를 선택해 주세요.
                        </p>
                    </Alert>
                </div>

                {/* 공통으로 사용하는 접이식 개설 폼 배치 (딱 한 번만 선언!) */}
                <TeamCreateForm
                    isOpen={showCreateForm}
                    onClose={() => setShowCreateForm(false)}
                    onCreate={handleCreateTeamSubmit}
                />

                {/* 핵심 분기: 가입된 팀이 0개일 때와 있을 때의 화면 제어 */}
                {myTeams.length === 0 ? (

                    /* 1. 가입된 팀이 없는 신규 유저용 온보딩 UI */
                    <div className="text-center p-5 border rounded-4 bg-body shadow-sm" style={{ maxWidth: '480px' }}>
                        <div className="mb-4 text-primary opacity-75">
                            <PlusCircle size={44} />
                        </div>
                        <h4 className="fw-bold mb-3 text-body">소속된 팀이 없습니다</h4>
                        <p className="text-secondary small lh-lg mb-4">
                            Essage를 시작하려면 워크스페이스를 직접 개설하거나,<br />
                            현재 개설된 다른 팀 목록을 확인해 가입해 보세요.
                        </p>
                        <Button variant="primary" className="w-100 py-2.5 fw-semibold rounded-3" onClick={() => setShowCreateForm(true)}>
                            첫 번째 워크스페이스 생성하기
                        </Button>
                        <Button variant="outline-secondary" className="w-100 py-2.5 fw-semibold rounded-3 my-2" onClick={handleOpenJoinModal}>
                            <Search size={16} className="me-1" /> 존재하는 팀 탐색 및 참여
                        </Button>
                    </div>

                ) : (
                    /* 2. 가입된 팀 목록 카드 리스트 출력 */
                    <div className="w-100">
                        <div className="d-flex justify-content-end mb-4 mx-auto pe-3" style={{ maxWidth: "900px" }}>
                            <Button variant="outline-secondary" className="btn-sm fw-medium rounded-3 px-3 py-2 mx-2" onClick={handleOpenJoinModal}>
                                <Search size={14} className="me-1" /> 다른 팀 참여하기
                            </Button>
                            <Button variant="outline-primary" className="btn-sm fw-medium rounded-3 px-3 py-2" onClick={() => setShowCreateForm(true)}>
                                + 새 워크스페이스 개설
                            </Button>
                        </div>

                        <div className="row g-4 w-100 justify-content-center mx-auto" style={{ maxWidth: "900px" }}>
                            {myTeams.map((team) => (
                                <div key={team.id} className="col-12 col-md-6">
                                    <div
                                        className="card-container h-100"
                                        onClick={() => handleTeamClick(team.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <article className="card card-hover h-100 rounded-4 border bg-body p-2">

                                            <div className="card-body d-flex flex-column h-100">

                                                <div className="mb-2">
                                                    <Badge
                                                        pill
                                                        bg="undefined"
                                                        className="d-inline-flex align-items-center category"
                                                    >
                                                        {team.category}
                                                    </Badge>
                                                </div>

                                                <h3 className="fw-bold custom-title line-clamp-1 mb-2">
                                                    {team.name}
                                                </h3>

                                                <p className="small lh-lg text-secondary line-clamp-2 mb-3">
                                                    {team.description}
                                                </p>

                                                <div className="mt-auto d-flex align-items-center justify-content-between border-top pt-3 small text-secondary">
                                                    <span className="fw-medium text-body">
                                                        <PeopleFill size={16} className="me-1" />
                                                        팀원 {team.members.length}명
                                                    </span>
                                                    <span className="text-primary fw-bold">입장하기 →</span>
                                                </div>

                                            </div>
                                        </article>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ================= ✨ 팀 탐색 및 참여 모달 추가 ================= */}
                <Modal show={showJoinModal} onHide={() => setShowJoinModal(false)} centered scrollable>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="fw-bold fs-5 w-100 text-center mt-2">참여 가능한 팀 목록</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="px-4 py-3">
                        <p className="text-muted small text-center mb-3">가입하고 싶은 워크스페이스를 선택해 주세요.</p>
                        <div className="d-flex flex-column gap-2">
                            {availableTeams.map((team) => (
                                <button
                                    key={team.id}
                                    type="button"
                                    className="w-100 text-start p-3 border rounded-3 bg-body hover-shadow d-flex align-items-center justify-content-between transition-all"
                                    onClick={() => handleSelectTeamToJoin(team)}
                                    style={{ transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bs-tertiary-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ minWidth: 0, flex: 1 }} className="pe-3">
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <span className="fw-bold text-dark">{team.name}</span>
                                            <Badge pill bg="secondary" style={{ fontSize: '10px' }}>{team.category}</Badge>
                                        </div>
                                        <div className="text-muted small text-truncate">{team.description}</div>
                                    </div>
                                    <div
                                        className="text-primary fw-bold d-flex align-items-center small"
                                        style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                                    >
                                        가입 <ArrowRightShort size={18} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="border-0 justify-content-center pb-4">
                        <Button variant="secondary" className="rounded-3 px-4 btn-sm" onClick={() => setShowJoinModal(false)}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </>
    );
}

export default TeamSelectPage;