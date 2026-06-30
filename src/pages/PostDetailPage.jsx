import '../css/PostDetailPage.css'
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import usePostStore from '../store/usePostStore';
import useCommentStore from '../store/useCommentStore';
import { HandThumbsUp, PersonCircle } from 'react-bootstrap-icons';
import useAccountStore from '../store/useAccountStore';


function PostDetailPage() {

    const POSTS = usePostStore((s) => s.posts);
    const COMMENTS = useCommentStore((s) => s.comments);
    const addComment = useCommentStore((s) => s.addComment);
    const lastCommentId = useCommentStore((s) => s.lastId);


    const user = useAccountStore((s) => s.user);
    const getName = useAccountStore((s) => s.getName);

    const navigate = useNavigate();

    const { id } = useParams();

    const post = POSTS.find(post => post.id === Number(id));

    const selectedComments = COMMENTS.filter(
        comment => comment.postId === Number(id)
    );

    const [commentInput, setCommentInput] = useState('');

    const likeComment = useCommentStore((s) => s.likeComment); //좋아요 기능

    const increaseViews = usePostStore((s) => s.increaseViews);
    const hasViewed = useRef(false); //조회수 중복 증가 방지

    const deleteComment = useCommentStore((s) => s.deleteComment); // 댓글 삭제


    useEffect(() => {
        if (post && !hasViewed.current) {

            increaseViews(post.id);
            hasViewed.current = true;
        }

    }, []);


    function submitComment() {

        if (!commentInput.trim()) {
            return;
        }

        if (!user) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }

        const newComment = {
            postId: Number(id),
            id: lastCommentId + 1,
            author: user?.email,
            timestamp: new Date().toLocaleString(),
            text: commentInput,
            likes: 0,
            likedUsers: []
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
                    <strong style={{ color: 'black' }}>{getName(post.author)}</strong>
                    <span>{post.date}</span>
                    <span>조회수 {post.views}</span>
                </div>

                <hr />

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
                    selectedComments.map(comment => {

                        const isLiked = (comment.likedUsers ?? []).includes(user?.email);

                        return (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-header">
                                    <PersonCircle className="profile-icon" />

                                    <strong style={{ fontSize: '15px' }}> {getName(comment.author)}</strong>

                                    <span style={{ fontSize: '14px', color: '#4a4949' }}> {comment.timestamp}</span>
                                </div>

                                <div className="comment-content">
                                    <p className="comment-text">{comment.text}</p>

                                    <div className="comment-actions">
                                        <button
                                            className="likes-btn"
                                            onClick={() => {
                                                if (!user) {
                                                    alert("로그인 후 이용 가능합니다.");
                                                    return;
                                                }

                                                likeComment(comment.id, user.email);
                                            }}
                                        >
                                            <HandThumbsUp
                                                size={16}
                                                color={isLiked ? "#2b6cff" : "#999"}
                                            />
                                            {comment.likes || 0}
                                        </button>

                                        {comment.author === user?.email && (
                                            <button
                                                className="cmt-delete-btn"
                                                onClick={() => {
                                                    if (window.confirm('댓글을 삭제하시겠습니까?')) {
                                                        deleteComment(comment.id);
                                                    }
                                                }}
                                            >
                                                삭제
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <hr />
                            </div>
                        );
                    })
                }

                <div className="comment-write">

                    <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        maxLength={180}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault(); //줄바꿈 X
                                submitComment(); //댓글 등록
                            }
                        }}
                        placeholder='댓글을 입력하세요'
                    />

                    <div className="comment-footer">
                        <span className="comment-count"
                            style={{
                                color: commentInput.length >= 160 ? "red" : "#666"
                            }}>
                            {commentInput.length}/180자
                        </span>
                        <button onClick={submitComment}>등록</button>
                    </div>

                </div>


            </div>
        </div>


    );
}

export default PostDetailPage;