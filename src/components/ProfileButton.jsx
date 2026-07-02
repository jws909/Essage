import '../css/ProfileButton.css';
import { Button } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';

function ProfileButton({ size, userProfile, onClick }) {
    return (
        <Button
            variant="secondary"
            className="rounded-circle d-flex align-items-center justify-content-center profile-btn"
            // onClick이 넘어왔을 때만 실행하고, 없으면 아무 동작도 하지 않음
            onClick={(e) => onClick?.(e)}
            // 만약 클릭 이벤트가 없다면 마우스 커서 모양을 손가락(pointer) 대신 기본 화살표(default)로 체인지
            style={{ cursor: onClick ? 'pointer' : 'default', width: size, height: size }}
        >
            {userProfile ? (
                /* 1. 프로필 이미지가 존재할 때 */
                <img
                    src={import.meta.env.BASE_URL + userProfile.path}
                    alt={userProfile.label}
                    className="rounded-circle"
                />
            ) : (
                /* 2. 프로필 이미지가 없을 때 (기본 아이콘으로 대체) */
                <Person />
            )}
        </Button>
    );
}

export default ProfileButton;