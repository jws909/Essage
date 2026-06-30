import { create } from "zustand";
import { persist } from "zustand/middleware";
import COMMENTS, { lastCommentId } from '../data/commentData'

const useCommentStore = create(
    persist(
        (set, get) => ({
            comments: COMMENTS,
            lastId: lastCommentId,

            // 댓글 작성
            addComment: (comment) =>
                set((state) => ({
                    comments: [...state.comments, comment],
                    lastId: comment.id,
                })),

            // 좋아요 수
            likeComment: (id, email) =>
                set((state) => ({
                    comments: state.comments.map((comment) => {

                        if (comment.id !== id) {
                            return comment;
                        }

                        //이미 좋아요를 눌렀으면 취소
                        if (comment.likedUsers.includes(email)) {
                            return {
                                ...comment,
                                likes: comment.likes - 1,
                                likedUsers: comment.likedUsers.filter(
                                    userEmail => userEmail !== email
                                ),
                            };
                        }

                        //처음 누른 경우
                        return {
                            ...comment,
                            likes: comment.likes + 1,
                            likedUsers: [...comment.likedUsers, email],
                        };
                    }),
                })),

            // deleteComment: (id) =>
            //     set((state) => ({
            //         comments: state.comments.filter((c) => c.id !== id),
            //     })),

            // email을 가진 작성자가 작성한 총 댓글 수
            getCommentCountByEmail: (email) => {
                return get().comments.filter((comment) => comment.author === email).length;
            },
        }),
        {
            name: "comment-storage", // localStorage에 저장될 key
        }
    )
);

export default useCommentStore;