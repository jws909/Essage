import '../css/PostWritePage.css'
import { useEffect, useState } from "react";
import usePostStore from '../store/usePostStore';
import { useNavigate, useParams } from "react-router";
import useAccountStore from '../store/useAccountStore';

function PostWritePage() {
    const [category, setCategory] = useState("자유 게시판");
    const [nickname, setNickname] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const lastPostId = usePostStore((s) => s.lastId);
    const addPost = usePostStore((s) => s.addPost);

    const currentUser = useAccountStore((s) => s.user);

    const { teamId, id } = useParams();

    const posts = usePostStore((s) => s.posts);

    function getToday() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function parseText(text) {
        const paragraphs = text
            .split("\n")
            .map(p => p.trim())
            .filter(p => p.length > 0);

        return {
            preview: paragraphs[0] || "",
            paragraphs
        };
    }

    const handleSubmit = () => {
        if (!title.trim()) {
            alert("제목을 입력해주세요");
            return;
        }
        if (!content.trim()) {
            alert("본문 내용을 입력해주세요");
            return;
        }
        if (currentUser === null) {
            alert("로그인을 해주세요.")
            return;
        }

        const postData = {
            id: editPost ? editPost.id : lastPostId + 1,
            teamId,
            category: category.split(" ")[0],
            title,
            author: currentUser.email,
            date: editPost ? editPost.date : getToday(),
            views: editPost ? editPost.views : 0,
            preview: parseText(content).preview,
            paragraphs: parseText(content).paragraphs,
        };

        if (editPost) {
            updatePost(postData);
            alert("게시글이 수정되었습니다.");
        } else {
            addPost(postData);
            alert("게시글이 등록되었습니다.");
        }

        navigate(`/teams/${teamId}`);
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm(
            "작성중인 내용이 삭제됩니다. 정말 취소하시겠습니까?"
        );
        if (confirmCancel) {
            navigate(`/teams/${teamId}`);
        }
    };

    // 게시글 수정
    const updatePost = usePostStore((s) => s.updatePost);

    const editPost = posts.find(
        (post) => post.id === Number(id)
    );

    useEffect(() => {
        if (editPost) {
            setCategory(editPost.category);
            setTitle(editPost.title);
            setContent(editPost.paragraphs.join('\n'));
        }
    }, [editPost])


    return (
        <>
            <div className='write-page'>
                <h1 className='page-title'> 새 글 작성하기</h1>

                <p className='page-desc'> 팀원들과 공유 하고 싶은 소식, 질문, 자료를 자유롭게 작성해 주세요.</p>

                <div className='write-card'>

                    {/* 카테고리 */}
                    <div className='form-group d-flex'>
                        <label>카테고리</label>

                        <select className='ms-2 choice' value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option>공지 게시판</option>
                            <option>자유 게시판</option>
                            <option>질문 게시판</option>
                            <option>정보 게시판</option>

                        </select>
                    </div>

                    {/* 닉네임 */}
                    {/* <div className='form-group'>
                        <label>작성자 닉네임</label>
                        <input type='text'  value={nickname} onChange={(e) =>
                            setNickname(e.target.value)
                        } />
                    </div> */}
                    {/* 제목 */}
                    <div className='form-group'>
                        <label>글제목</label>
                        <input type='text' placeholder='제목을 입력하세요' value={title} onChange={(e) =>
                            setTitle(e.target.value)
                        } />
                    </div>

                    {/* 내용 */}
                    <div className='form-group'>
                        <label>본문내용</label>
                        <textarea placeholder='우리 팀원들과 공유할 내용을 입력하세요.' maxLength={1000}
                            value={content} onChange={(e) => setContent(e.target.value)} />

                        <p className='text-count'>{content.length}/1000자</p>
                    </div>

                    {/* 파일첨부 */}
                    <div className='form-group'>
                        <label>파일(이미지)첨부</label>
                        <input type="file"></input>
                    </div>


                    {/* 버튼 */}
                    <div className='button-area'>
                        <button className='cancel-btn' onClick={handleCancel}>취소</button>
                        <button 
                        className='submit-btn' 
                        onClick={handleSubmit}
                        >
                            {editPost ? "수정하기" : "게시하기"} </button>
                    </div>
                </div>
            </div>
        </>


    );
}

export default PostWritePage;