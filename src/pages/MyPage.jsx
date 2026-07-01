import '../css/MyPage.css'

import { PencilSquare, Envelope, FileEarmarkText, ChatLeft } from 'react-bootstrap-icons';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import useAccountStore from '../store/useAccountStore'
import { useState } from 'react';
import usePostStore from '../store/usePostStore';
import useCommentStore from '../store/useCommentStore';
import useProfileStore from '../store/useProfileStore';
import ProfileButton from '../components/ProfileButton';
import { DEFAULT_PROFILES } from '../data/profileData';


function MyPage() {

    const currentUser = useAccountStore((s) => s.user);
    const updateProfile = useAccountStore((s) => s.updateProfile);

    const [ nickName, setNickName ] = useState(currentUser.name);
    const [ biography, setBiography ] = useState(currentUser.bio);

    const getPostCountByEmail = usePostStore((s) => s.getPostCountByEmail);
    const getCommentCountByEmail = useCommentStore((s) => s.getCommentCountByEmail);

    const profiles = useProfileStore((s) => s.profiles);
    const getUserProfile = useProfileStore((s) => s.getUserProfile);
    const setUserProfile = useProfileStore((s) => s.setUserProfile);
    const userProfile = getUserProfile(currentUser.email); // 프로필이 없으면 칼같이 null이 들어옴

    // 모달 열림/닫힘 상태 관리
    const [ showModal, setShowModal ] = useState(false);

    // 디폴트 프로필 사진 클릭 시 작동하는 핸들러
    const handleProfileSelect = (profileId) => {
        if (!currentUser?.email) return;

        // 1. 전역 스토어(Zustand + LocalStorage)에 변경사항 반영
        setUserProfile(currentUser.email, profileId);

        // 2. 모달 닫기
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nickName || !biography) return;

        updateProfile({
            email: currentUser.email,
            name: nickName,
            bio: biography
        });

        alert("변경사항이 저장되었습니다.");
    }

    return (
        <div className="mypage-wrapper">


            <h1>마이페이지</h1>
            <p><span>{currentUser.name}</span> 님, 환영합니다! 내 활동 내역을 확인하고 프로필 정보를 수정할 수 있습니다.</p>

            <div className="mypage-header">
                <ProfileButton size={120} userProfile={userProfile} onClick={() => setShowModal(true)} />
                <div>
                    <h5>{currentUser.name}</h5>
                    <p><Envelope size={16} className='me-1' />{currentUser.email}</p>
                    <span className='mypage-post me-2'>
                        <FileEarmarkText size={14} /> 내가 작성한 글: {getPostCountByEmail(currentUser.email)}개
                    </span>
                    <span className='mypage-post'>
                        <ChatLeft size={14} /> 내가 작성한 댓글: {getCommentCountByEmail(currentUser.email)}개
                    </span>
                </div>
            </div>

            {/* ================= 프로필 변경 모달 영역 ================= */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered // 화면 정확히 정중앙에 뜨도록 설정
                size="md"
            >
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold w-100 text-center fs-5 mt-2">
                        프로필 이미지 변경
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-4">
                    {/* 6개의 이미지 비율 깨짐 없이 바둑판 정렬 (row-cols-3) */}
                    <div className="row row-cols-3 g-3 justify-content-center">
                        {DEFAULT_PROFILES.map((profile) => (
                            <div key={profile.id} className="col text-center">
                                <button
                                    type="button"
                                    className="btn p-0 border-0 bg-transparent"
                                    onClick={() => handleProfileSelect(profile.id)}
                                    title={profile.label}
                                >
                                    <img
                                        src={profile.path}
                                        alt={profile.label}
                                        className={`rounded-circle bg-light border img-fluid p-2 ${userProfile?.id === profile.id ? 'border-primary border-3 shadow-sm' : ''
                                            }`}
                                        style={{
                                            width: '85px',
                                            height: '85px',
                                            objectFit: 'contain',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
                                        }}
                                        // 마우스 호버 시 살짝 커지는 효과 추가
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div className="small text-muted mt-2 fw-medium" style={{ fontSize: '12px' }}>
                                        {profile.label}
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>

                <Modal.Footer className="border-0 justify-content-center pt-0 pb-4">
                    <Button variant="secondary" className="rounded-3 px-4" onClick={() => setShowModal(false)}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>

            <br />

            <form onSubmit={handleSubmit}>

                <div className='mypage-update'>
                    <p>프로필 수정</p>
                    <p>닉네임</p>
                    <input
                        type="text"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                    <p>자기소개</p>
                    <textarea
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                    />

                </div>

                <div className='mypage-btn'>
                    <button type='button' style={{ backgroundColor: '#969696', width: '60px' }}>취소</button>
                    <button type='submit'>변경사항 저장</button>
                </div>

            </form>

        </div>
    )

}

export default MyPage;