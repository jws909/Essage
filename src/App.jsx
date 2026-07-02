// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import PostWritePage from './pages/PostWritePage'
import MyPage from './pages/MyPage';
import ArchivePage from './pages/ArchivePage';
import Footer from './components/Footer';
import React, { useEffect } from "react";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CalendarPage from './pages/CalendarPage';
import TeamSelectPage from './pages/TeamSelectPage';

import useAccountStore from './store/useAccountStore';
import useTeamStore from './store/useTeamStore';
import TeamListPage from './pages/TeamListPage';


function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로를 파악하기 위함

  const user = useAccountStore((state) => state.user);
  const currentTeamId = useTeamStore((state) => state.currentTeamId);

  useEffect(() => {
    // 1단계: 로그인을 안 했을 때 (무조건 로그인이나 회원가입으로)
    if (!user) {
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/login', { replace: true });
      }
    }
    // 2단계: 로그인은 했지만 팀 선택을 안 했을 때 (무조건 팀 선택창으로)
    else if (!currentTeamId) {
      if (location.pathname !== '/select-team') {
        navigate('/select-team', { replace: true });
      }
    }
    // 3단계: 인증 및 팀 선택 완료 시 (잘못된 경로 진입 시 내 팀 홈화면으로)
    else {
      const isAccessRestricted =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/select-team';

      if (isAccessRestricted) {
        navigate(`/teams/${currentTeamId}`, { replace: true });
      }

      // 타인 팀 ID 하이재킹 방어
      const pathParts = location.pathname.split('/');
      if (pathParts[ 1 ] === 'teams' && pathParts[ 2 ]) {
        const urlTeamId = Number(pathParts[ 2 ]);
        if (urlTeamId !== currentTeamId) {
          navigate(`/teams/${currentTeamId}`, { replace: true });
        }
      }
    }
  }, [ user, currentTeamId, location.pathname, navigate ]);


  return (
    <>
      {/* 로그인과 팀 선택이 모두 완료되었을 때만 상단 헤더 노출 */}
      {user && currentTeamId && <NavigationBar />}

      <div className="d-flex flex-column min-vh-100">
        <div
          className="flex-grow-1 container py-4 py-sm-5"
          style={{ marginTop: user && currentTeamId ? '60px' : '0px' }}
        >
          <Routes>
            {/* 비인증 / 팀 선택 전 전용 라우트 */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/select-team' element={<TeamSelectPage />} />

            {/* ✨ 팀별 고유 주소 적용 (teamId를 동적으로 받음) */}
            <Route path='/teams/:teamId' element={<HomePage />} />
            <Route path='/teams/:teamId/detail/:id' element={<PostDetailPage />} />
            <Route path='/teams/:teamId/write' element={<PostWritePage />} />
            <Route path='/teams/:teamId/write/:id' element={<PostWritePage />} />
            <Route path='/teams/:teamId/archive' element={<ArchivePage />} />
            <Route path='/teams/:teamId/calendar' element={<CalendarPage />} />
            <Route path='/teams/:teamId/teamlist' element={<TeamListPage />} />
            <Route path='/mypage' element={<MyPage />} />

          </Routes>
        </div>

        {/* 로그인과 팀 선택이 모두 완료되었을 때만 푸터 노출 */}
        {user && currentTeamId && <Footer />}
      </div>
    </>
  );
}

export default App;
