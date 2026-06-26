import '../css/PostDetailPage.css'
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import usePostStore from '../store/usePostStore';
import useCommentStore from '../store/useCommentStore';

import { PersonCircle } from 'react-bootstrap-icons';


function PostDetailPage() {

    const POSTS = usePostStore((s) => s.posts);
    const COMMENTS = useCommentStore((s) => s.comments);
    const addComment = useCommentStore((s) => s.addComment);
    const lastCommentId = useCommentStore((s) => s.lastId);

    const navigate = useNavigate();

    const { id } = useParams();

    const post = POSTS.find(
        post => post.id === Number(id)
    );

    const selectedComments =
        COMMENTS.filter(comment => comment.postId === Number(id));

    const [ commentInput, setCommentInput ] = useState('');

    function submitComment() {

        if (commentInput.trim() === '') {
            return;
        }

        const newComment = {
            postId: Number(id),
            id: lastCommentId + 1,
            nickname: "나",
            timestamp: new Date().toLocaleString(),
            text: commentInput
        };

        addComment(newComment);
        setCommentInput('');
    }

    return (

        <div className='detail-wrapper'>

            <p className="back-btn" onClick={() => navigate("/")}>
                ← 목록으로 돌아가기</p>

            <div className='detail-card'>
                <span className='category'>{post.category}</span>

                <h3><strong>{post.title}</strong></h3>

                <div className="post-info">
                    <strong style={{ color: 'black' }}>{post.author}</strong>
                    <span>{post.date}</span>
                    <span>조회수 {post.views}</span>
                </div>


                <hr />
                <br />

                {
                    post.paragraphs.map((paragraph, index) => (
                        <p className="post-content" key={index}>{paragraph}</p>
                    ))
                }

            </div>

            <br />

            <div className="comment-section">

                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    댓글 <span style={{ color: '#2b6cff' }}>{selectedComments.length}</span>
                </p>

                {
                    selectedComments.map(comment => (


                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <PersonCircle className="profile-icon" />

                                <strong style={{ fontSize: '15px' }}> {comment.nickname}</strong>

                                <span style={{ fontSize: '14px', color: '#4a4949' }}> {comment.timestamp}</span>
                            </div>

                            <p style={{ fontSize: '15px' }}>{comment.text}</p>

                            <hr />

                        </div>
                    ))
                }

                <div className="comment-write">

                    <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); //줄바꿈 X
                                submitComment(); //댓글 등록
                            }
                        }}
                        placeholder='댓글을 입력하세요'
                    />

                    <button onClick={submitComment}>등록</button>

                </div>


            </div>
        </div>


    );
}

export default PostDetailPage;