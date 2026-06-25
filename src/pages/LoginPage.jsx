import '../css/LoginPage.css'
import { useState } from 'react';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            console.log("에러 발생");
            setError(true);
            return;
        }

        setError(false);

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
                    <a href="/signup" target="_self" id="signup">회원가입</a>

                </div>


            </form>

        </div>
    )

}

export default LoginPage;