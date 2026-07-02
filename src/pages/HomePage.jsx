import '../css/HomePage.css'
import { Megaphone, Search } from 'react-bootstrap-icons'
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from "react";
import PostCard from '../components/PostCard';
import usePostStore from '../store/usePostStore'
import { useParams } from 'react-router-dom';
import useTeamStore from '../store/useTeamStore';
import useAccountStore from '../store/useAccountStore';

function HomePage() {

    const postData = usePostStore((s) => s.posts);
    const getTeamsByUserEmail = useTeamStore((state) => state.getTeamsByUserEmail);
    const user = useAccountStore((state) => state.user);

    const { teamId } = useParams();
    const numericTeamId = Number(teamId);

    // 내 팀 목록에서 현재 URL의 팀 찾기
    const currentTeam = getTeamsByUserEmail(user?.email).find(t => t.id === Number(teamId));

    useEffect(() => {
        if (currentTeam) {
            // ✨ 브라우저 탭 제목을 "Essage | Essage 개발팀" 형태로 변경
            document.title = `Essage | ${currentTeam.name}`;
        }

        // 컴포넌트 언마운트 시 기본 타이틀로 복구
        return () => { document.title = "Essage"; };
    }, [ currentTeam ]);
    
    return (
        <>
            <div className="d-flex flex-column gap-4">
                <Alert
                    variant="info"
                    className="d-flex align-items-start align-items-sm-center gap-3 rounded-4 px-4 py-3 mb-0"
                    role="status"
                >
                    <Megaphone
                        className="flex-shrink-0 mt-1 mt-sm-0"
                        style={{ width: '20px', height: '20px' }}
                    />

                    <p className="mb-0 small fw-medium">
                        <span className="fw-bold">[공지] </span>
                        이번 주 토요일 정기 회의가 있습니다. 모든 팀원은 오후 2시까지 참석해 주세요.
                    </p>
                </Alert>

                <div className="position-relative search-input">
                    <Search size={14} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />

                    <input
                        type="search"
                        className="form-control rounded-4 ps-5 py-2"
                        placeholder="검색어를 입력하거나 날짜별로 필터링하세요"
                    />
                </div>

                <div>
                    <h2 className="mb-4 fw-bold fs-5">최근 게시글</h2>

                    <div className="row g-4 align-items-stretch">
                        {postData.filter((post) => Number(post.teamId) === numericTeamId)
                            .slice()
                            .reverse()
                            .map(post => (
                                <div key={post.id} className="col-12 col-sm-6 col-lg-4">
                                    <PostCard post={post} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;