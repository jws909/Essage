import '../css/PostDetailPage.css'
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import usePostStore from '../store/usePostStore';
import useCommentStore from '../store/useCommentStore';
import { HandThumbsUp, PersonCircle } from 'react-bootstrap-icons';
import useAccountStore from '../store/useAccountStore';

import ProfileButton from '../components/ProfileButton'
import useProfileStore from '../store/useProfileStore'


function PostDetailPage() {

    // Store에서 데이터 가져오기
    const POSTS = usePostStore((s) => s.posts);
    const COMMENTS = useCommentStore((s) => s.comments);

    const addComment = useCommentStore((s) => s.addComment);
    const lastCommentId = useCommentStore((s) => s.lastId);

    const likeComment = useCommentStore((s) => s.likeComment);
    const deleteComment = useCommentStore((s) => s.deleteComment);
    
    const deleteCommentsByPostId = useCommentStore(
        (s) => s.deleteCommentsByPostId
    );
    const deletePost = usePostStore((s) => s.deletePost);
    const increaseViews = usePostStore((s) => s.increaseViews);
    
    // 로그인 사용자 정보
    const user = useAccountStore((s) => s.user);
    const getName = useAccountStore((s) => s.getName);

    const navigate = useNavigate();
    const { id, teamId } = useParams();

    // 프로필 불러오기
    const getUserProfile = useProfileStore((s) => s.getUserProfile);

    // 현재 게시글 및 댓글 조회
    const post = POSTS.find(
        (post) => post.id === Number(id)
    );

    const selectedComments = COMMENTS.filter(
        (comment) => comment.postId === Number(id)
    );

    const [commentInput, setCommentInput] = useState("");
    const hasViewed = useRef(false); // 조회수 중복 증가 방지

    // 게시글이 삭제되었거나 존재하지 않을 경우 목록으로 이동
    useEffect(() => {
        if (!post) {
            navigate(`/teams/${teamId}`, { replace: true });
        }
    }, [post, navigate, teamId]);

    // 최초 1회 조회수 증가
    useEffect(() => {
        if (!hasViewed.current) {
            increaseViews(post.id);
            hasViewed.current = true;
        }
    }, [increaseViews, post]);

    
    // 댓글 등록
    function submitComment() {

        // 공백 댓글 방지
        if (!commentInput.trim()) {
            return;
        }

        // 로그인 사용자만 댓글 작성 가능
        if (!user) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }

        const newComment = {
            postId: Number(id),
            id: lastCommentId + 1,
            author: user.email,
            timestamp: new Date().toLocaleString(),
            text: commentInput,
            likes: 0,
            likedUsers: [],
        };

        addComment(newComment);
        setCommentInput("");
    }

    // 게시글이 없으면 더 이상 렌더링하지 않음
    if (!post) {
        return null;
    }

    return (

        <div className='detail-wrapper'>

            <p className="back-btn" onClick={() => navigate(`/teams/${teamId}`)}>
                ← 목록으로 돌아가기</p>

            <div className='detail-card'>
                <span className='category'>{post.category}</span>

                <h3><strong>{post.title}</strong></h3>

                <div className="post-info d-flex gap-2 mt-5 ">
                    <ProfileButton size={20} userProfile={getUserProfile(post.author)}/>
                    <strong style={{ color: 'black' }}>{getName(post.author)}</strong>
                    <div className='ms-auto d-flex gap-2'>
                        <span>{post.date}</span>
                        <span>조회수 {post.views}</span>
                    </div>
                </div>

                <hr />

                {
                    post.paragraphs.map((paragraph, index) => (
                        <p className="post-content" key={index}>{paragraph}</p>
                    ))
                }
                {post.author === user?.email && (
                    <div className='post-actions'>

                        <button onClick={() => navigate(`/teams/${teamId}/write/${post.id}`)}>수정</button>
                        <button onClick={() => {
                            if (window.confirm('게시글을 삭제하시겠습니까?')) {
                                deletePost(post.id, user.email);
                                deleteCommentsByPostId(post.id); // 게시글이 삭제되면 댓글도 삭제
                                navigate(`/teams/${teamId}`);
                            }
                        }}>삭제</button>
                    </div>

                )}


            </div>

            <br />

            {/* 댓글 영역 */}
            <div className="comment-section">

                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    댓글 <span style={{ color: '#2b6cff' }}>{selectedComments.length}</span>
                </p>

                {
                    selectedComments.map(comment => {

                        const isLiked = (comment.likedUsers ?? []).includes(user?.email);

                        return (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-header d-flex gap-1">
                                    <ProfileButton size={18} userProfile={getUserProfile(comment.author)}/>

                                    <strong style={{ fontSize: '15px' }}> {getName(comment.author)}</strong>

                                    <span className='ms-auto' style={{ fontSize: '14px', color: '#4a4949' }}> 
                                        {comment.timestamp}
                                    </span>
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