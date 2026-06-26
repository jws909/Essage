import '../css/LoginPage.css'
import { useState } from 'react';
import { Link } from 'react-router';
import useAccountStore from '../store/useAccountStore';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const accounts = useAccountStore((s)=>s.accounts);
    const login = useAccountStore((s)=>s.login);

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            setError(true);
            return;
        }

        if(login(email, password)){
            setError(false);
            alert('로그인 성공!');
        } else {
            setError(true);
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 로그인 처리
    }


    return (

        <div className='login-container'>
            <h3>로그인</h3>
            <p className='login-desc'>Essage 커뮤니티에 오신 것을 환영합니다.</p>

            <form onSubmit={handleLogin}>
                <div className="login-info">
                    <label htmlFor="email">아이디</label>
                    <input
                        type="email"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    <br />
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        className="input-box"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />

                    {error && (

                        <p className="error-message">
                            이메일과 비밀번호를 입력하세요.
                        </p>
                    )}

                    <button type="submit" className="btn-login">
                        로그인
                    </button>
                </div>

                <br />

                <div className='login-signup'>

                    <span>아직 계정이 없으신가요?</span>
                    <Link to='/signup' id='signup'>
                    회원가입</Link>

                </div>


            </form>

        </div>
    )

}

export default LoginPage;