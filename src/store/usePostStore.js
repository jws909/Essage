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
                    posts: [ ...state.posts , post],
                    lastId: post.id+1,
                })),
            // 조회수 증가 함수
            increaseViews: (id) => set((state)=>({
                posts: state.posts.map((post) =>post.id===id
                ? {
                    ...post,
                    views: post.views +1,
                }
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