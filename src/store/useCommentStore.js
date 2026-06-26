import { create } from "zustand";
import COMMENTS, { lastCommentId } from '../data/commentData'

const useCommentStore = create((set) => ({
    comments: COMMENTS,
    lastId: lastCommentId,

    addComment: (comment) =>
        set((state) => ({
            comments: [ ...state.comments, comment ],
            lastId: comment.id,
        })),

    // deletePost: (id) =>
    //     set((state) => ({
    //         posts: state.posts.filter((p) => p.id !== id),
    //     })),
}));

export default useCommentStore;