import useAccountStore from "../store/useAccountStore";
import useTeamStore from "../store/useTeamStore";
import { EmojiSmile, PeopleFill } from 'react-bootstrap-icons'
import { Alert, Badge } from 'react-bootstrap';
import '../css/TeamSelectPage.css'
import { useNavigate } from "react-router";

function TeamSelectPage() {
    const navigate = useNavigate();

    const user = useAccountStore((s) => s.user);
    const getTeamsByUserEmail = useTeamStore((s) => s.getTeamsByUserEmail);
    const setCurrentTeamId = useTeamStore((s) => s.setCurrentTeamId);

    function handleTeamClick(id) {
        setCurrentTeamId(id);
        navigate("/teams/" + id);
    }

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

                <div className="row g-4 w-100 justify-content-center" style={{ maxWidth: "900px" }}>
                    {getTeamsByUserEmail(user.email).map((team) => (
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
        </>
    );
}

export default TeamSelectPage;