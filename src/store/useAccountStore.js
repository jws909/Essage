import { create } from "zustand";
import USERS from "../data/accountData";

const useAccountStore = create((set, get) => ({
    user: null,
    accounts: USERS,

    addAccount: (account) =>
        set((state) => ({
            accounts: [ ...state.accounts, account ],
        })),
    
    login: (email, password) => {
        const { accounts } = get(); // state에서 가져오기
        const account = accounts.find(
            acc => acc.email == email && acc.password == password
        );

        if(account){
            set({
                user: account
            });
            return true;
        }

        return false;
    },

}));

export default useAccountStore;