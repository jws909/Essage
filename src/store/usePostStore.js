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
                    posts: [...state.posts, post],
                    lastId: post.id + 1,
                })),
            // 조회수 증가 함수
            increaseViews: (id) => set((state) => ({
                posts: state.posts.map((post) => post.id === id
                    ? {
                        ...post,
                        views: post.views + 1,
                    }
                    : post
                ),
            })),
            // email을 가진 작성자가 작성한 총 게시글 수
            getPostCountByEmail: (email) => {
                return get().posts.filter((post) => post.author === email).length;
            },

            // 게시글 삭제
            deletePost: (id, email) =>
                set((state) => ({
                    posts: state.posts.filter(
                        (post) =>
                            !(post.id === id && post.author === email)
                    ),
                })),

            // 게시글 수정
            updatePost: (updatePost) =>
                set((state) => ({
                    posts: state.posts.map((post) =>
                        post.id === updatePost.id
                            ? updatePost
                            : post
                    ),
                })),
        }),

        {
            name: "post-storage", // localStorage에 저장될 key
        }
    )
);

export default usePostStore;