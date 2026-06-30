import { useNavigate } from 'react-router';
import '../css/PostCard.css'
import { Badge } from 'react-bootstrap';
import useAccountStore from "../store/useAccountStore";

function PostCard({ post }) {

    let navigate = useNavigate();

    const getName = useAccountStore((s) => s.getName);

    return (
        <div
            className="post-card-container h-100"
            onClick={() => navigate("/detail/" + post.id)}
        >
            <article className="card card-hover h-100 rounded-4 border bg-body p-2">

                <div className="card-body d-flex flex-column h-100">

                    {/* TOP 영역 (badge 고정) */}
                    <div className="mb-2">
                        <Badge
                            pill
                            bg="undefined"
                            className="d-inline-flex align-items-center post-category"
                        >
                            {post.category}
                        </Badge>
                    </div>

                    {/* MIDDLE 영역 (콘텐츠) */}
                    <h3 className="fw-bold custom-title line-clamp-1 mb-2">
                        {post.title}
                    </h3>

                    <p className="small lh-lg text-secondary line-clamp-2 mb-3">
                        {post.preview}
                    </p>

                    {/* BOTTOM 영역 */}
                    <div className="mt-auto border-top pt-3">

                        <div className="d-flex align-items-center justify-content-between small text-secondary">

                            <span className="fw-medium text-body">
                                {getName(post.author)}
                            </span>

                            <time dateTime={post.date}>
                                {post.date}
                            </time>

                        </div>

                        <div className="small text-secondary mt-1">
                            조회수 {post.views}
                        </div>

                    </div>


                </div>
            </article>
        </div>
    );
}

export default PostCard;