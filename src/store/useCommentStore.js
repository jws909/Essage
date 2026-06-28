import { create } from "zustand";
import { persist } from "zustand/middleware";
import COMMENTS, { lastCommentId } from '../data/commentData'

const useCommentStore = create(
    persist(
        (set) => ({
            comments: COMMENTS,
            lastId: lastCommentId,

            // 댓글 작성
            addComment: (comment) =>
                set((state) => ({
                    comments: [ ...state.comments, comment ],
                    lastId: comment.id,
                })),

            // deleteComment: (id) =>
            //     set((state) => ({
            //         comments: state.comments.filter((c) => c.id !== id),
            //     })),
        }),
        {
            name: "comment-storage", // localStorage에 저장될 key
        }
    )
);

export default useCommentStore;