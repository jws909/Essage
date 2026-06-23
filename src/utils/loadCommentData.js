
const loadCommentData = () => {
    const stored = localStorage.getItem("commentData");
    return stored ? JSON.parse(stored) : [];
};

export default loadCommentData;