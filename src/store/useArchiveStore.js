import { create } from "zustand";
const useArchiveStore = create((set) => ({
    lastId: 4,
    files: [
        {
            id: 1,
            title: "팀_프로젝트_기획서.pdf",
            size: "2.4MB",
            date: "2025-06-01",
            writer: "관리자"
        },
        {
            id: 2,
            title: "와이어프레임_v2.fig",
            size: "8.1MB",
            date: " 2025-06-08",
            writer: "관리자"
        },
        {
            id: 3,
            title: "회의록_06월_2주차.docx",
            size: "320KB",
            date: " 2025-06-12",
            writer: "관리자"
        },
        {
            id: 4,
            title: "디자인_가이드.zip",
            size: "15.6MB",
            date: " 2025-06-14",
            writer: "관리자"
        }],
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