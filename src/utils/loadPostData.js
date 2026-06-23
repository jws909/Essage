
const loadPostData = () => {
    const stored = localStorage.getItem("postData");
    return stored ? JSON.parse(stored) : [];
};

export default loadPostData;