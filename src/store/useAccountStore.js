import { create } from "zustand";
import { persist } from "zustand/middleware";
import USERS from "../data/accountData";

const useAccountStore = create(
    persist(
        (set, get) => ({
            user: null,
            accounts: USERS,

            // 회원가입
            addAccount: (account) =>
                set((state) => ({
                    accounts: [ ...state.accounts, account ],
                })),

            // 로그인
            login: (email, password) => {
                const { accounts } = get(); // state에서 가져오기
                const account = accounts.find(
                    acc => acc.email === email && acc.password === password
                );

                if (account) {
                    set({
                        user: account
                    });
                    return true;
                }

                return false;
            },

            // 로그아웃
            logout: () => set({ user: null }),

            // 프로필 수정
            updateProfile: ({ email, name, bio }) =>
                set((state) => {
                    const updatedAccounts = state.accounts.map((acc) =>
                        acc.email === email
                            ? {
                                ...acc,
                                name: name ?? acc.name,
                                bio: bio ?? acc.bio,
                            }
                            : acc
                    );

                    const updatedUser =
                        state.user?.email === email
                            ? {
                                ...state.user,
                                name: name ?? state.user.name,
                                bio: bio ?? state.user.bio,
                            }
                            : state.user;

                    return {
                        accounts: updatedAccounts,
                        user: updatedUser,
                    };
                }),

            // email로 name알아내기
            getName: (email) => {
                const { accounts } = get();
                const account = accounts.find(acc => acc.email === email);

                return account ? account.name : null;
            },

            // email로 bio알아내기
            getBio: (email) => {
                const { accounts } = get();
                const account = accounts.find(acc => acc.email === email);

                return account ? account.bio : null;
            }
        }),
        {
            name: "account-storage", // localStorage에 저장될 key
        }
    )
);

export default useAccountStore;