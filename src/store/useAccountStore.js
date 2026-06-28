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
        }),
        {
            name: "account-storage", // localStorage에 저장될 key
        }
    )
);

export default useAccountStore;