import { create } from "zustand";
const useArchiveStore = create((set) => ({
    lastId: 0,
    files: [],
    //글작성
    addFile: (file) =>
        set((state) => ({
            files: [file, ...state.files], // ← 맨 앞에 추가
            lastId: state.lastId + 1,
        })),
    //취소
    removeFile: (id) =>
        set((state) => ({
            files: state.files.filter(file => file.id !== id)
        }))
}));
export default useArchiveStore;