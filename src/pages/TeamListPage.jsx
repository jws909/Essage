import { useParams } from 'react-router';
import '../css/TeamListPage.css'
import useAccountStore from '../store/useAccountStore';
import useTeamStore from '../store/useTeamStore';
import useProfileStore from '../store/useProfileStore';
import ProfileButton from '../components/ProfileButton';

function TeamListPage() {

    const { teamId } = useParams();
    const user = useAccountStore((state) => state.user);
    const getName = useAccountStore((state) => state.getName);
    const getBio = useAccountStore((state) => state.getBio);
    const getTeamsByUserEmail = useTeamStore((state) => state.getTeamsByUserEmail);
    const numericTeamId = Number(teamId);

    // 내 팀 목록에서 현재 URL의 팀 찾기
    const currentTeam = getTeamsByUserEmail(user?.email).find(t => t.id === numericTeamId);

    // 프로필 불러오기
    const profiles = useProfileStore((s) => s.profiles);
    const getUserProfile = useProfileStore((s) => s.getUserProfile);

    return (
        <div className="team-list-page">
            <h1><span className='text-primary me-3'>{currentTeam.name}</span>팀원</h1>
            <div className="team-list-container my-5 gap-2">
                {
                    currentTeam.members.map((email) => {

                        return (
                            <div className="team-card">
                                <ProfileButton size={45} userProfile={getUserProfile(email)} />
                                <div>
                                    <h3>{getName(email)}</h3>
                                    <p>{email}</p>
                                </div>

                                <p className="text-black ms-auto">{getBio(email)}</p>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default TeamListPage;