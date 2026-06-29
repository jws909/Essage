import '../css/MyPage.css'

import { Person, PencilSquare } from 'react-bootstrap-icons';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import useAccountStore from '../store/useAccountStore'
import { useState } from 'react';


function MyPage() {

    const currentUser = useAccountStore((s) => s.user);
    const updateProfile = useAccountStore((s) => s.updateProfile);

    const [ nickName, setNickName ] = useState(currentUser.name);
    const [ biography, setBiography ] = useState(currentUser.bio);

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
                <Button variant="secondary" className="rounded-circle d-flex align-items-center justify-content-center mypage-profile-btn">
                    <Person size={50} />
                </Button>
                <div>
                    <h5>{currentUser.name}</h5>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>{currentUser.email}</span><br />
                    <span className='mypage-post'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg> 내가 작성한 글: 3개</span>
                    <span className='mypage-post' style={{ margin: '8px' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    </svg> 내가 작성한 댓글: 5개</span>

                </div>



            </div>
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