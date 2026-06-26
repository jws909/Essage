import '../css/SignupPage.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function SignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();

        if (!password || !passwordCheck) {
            setError('비밀번호를 입력하세요.')
            return;
        }

        if (password !== passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!email || !password) {
            setError('이메일과 비밀번호를 입력하세요.');
            return;
        }

        setError('');

        const user = {
            name,
            email,
            password
        };

        localStorage.setItem('user', JSON.stringify(user));

        console.log(user);
        console.log(localStorage.getItem('user'));
        
        alert('회원가입 성공');
        navigate('/login');
    }


    return (

        <div className='signup-container'>
            <h3>회원가입</h3>
            <p className='signup-desc'>Essage 커뮤니티에 함께하세요.</p>

            <form onSubmit={handleSignup}>
                <div className="signup-info">

                    <label htmlFor="text">이름</label>
                    <input
                        type="text"
                        className="input-box"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />


                    <label htmlFor="email">아이디</label>
                    <input
                        type="email"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        className="input-box"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />

                    <label htmlFor="password">비밀번호 확인</label>
                    <input
                        type="password"
                        className="input-box"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                    />

                    {error && (

                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-signup">
                        회원가입
                    </button>
                </div>

                <br />

                <div className='signup-footer'>

                    <span>이미 계정이 있으신가요?</span>
                    <Link to='/login' id='login'>
                    로그인</Link>

                </div>


            </form>

        </div>
    )

}

export default SignupPage;