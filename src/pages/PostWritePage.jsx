import '../css/PostWritePage.css'
import { useState } from "react";

function PostWritePage() {
    return (
        <>
            <div className='write-page'>
                <h1 className='page-title'> 새 글 작성하기</h1>

                <p className='page-desc'> 팀원들과 공유 하고 싶은 소식, 질문, 자료를 자유롭게 작성해 주세요.</p>

                <div className='write-card'>
                    <div className='form-group'>
                        <label>작성자 닉네임</label>
                        <input type='text' placeholder='작성자 닉네임을 입력하세요'></input>
                    </div>

                    <div className='form-group'>
                        <label>글제목</label>
                        <input type='text' placeholder='제목을 입력하세요'></input>
                    </div>

                    <div className='form-group'>
                        <label>본문내용</label>
                        <textarea placeholder='우리 팀원들과 공유할 내용을 입력하세요.'></textarea>
                    </div>

                    <div className='button-area'>
                        <button className='cancel-btn'>취소</button>
                        <button className='submit-btn'>게시하기</button>
                    </div>
                </div>
            </div>
        </>


            );
}

            export default PostWritePage;