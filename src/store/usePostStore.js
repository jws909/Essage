import { create } from "zustand";
import POSTS, { lastPostId } from '../data/postData'

const usePostStore = create((set) => ({
    posts: POSTS,
    lastId: lastPostId,

    addPost: (post) =>
        set((state) => ({
            posts: [ ...state.posts, post ],
            lastId: post.id,
        })),

    // deletePost: (id) =>
    //     set((state) => ({
    //         posts: state.posts.filter((p) => p.id !== id),
    //     })),
}));

export default usePostStore;