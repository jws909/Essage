import { create } from "zustand";
import { persist } from "zustand/middleware";
import POSTS, { lastPostId } from '../data/postData'

const usePostStore = create(
    persist(
        (set, get) => ({
            posts: POSTS,
            lastId: lastPostId,

            // 글 작성
            addPost: (post) =>
                set((state) => ({
                    posts: [ ...state.posts, post ],
                    lastId: post.id,
                })),

            // deletePost: (id) =>
            //     set((state) => ({
            //         posts: state.posts.filter((p) => p.id !== id),
            //     })),

            // email을 가진 작성자가 작성한 총 게시글 수
            getPostCountByEmail: (email) => {
                return get().posts.filter((post) => post.author === email).length;
            },
        }),
        {
            name: "post-storage", // localStorage에 저장될 key
        }
    )
);

export default usePostStore;