import { create } from "zustand";
import { persist } from "zustand/middleware";
import PROFILES, { DEFAULT_PROFILES } from "../data/profileData";

const useProfileStore = create(
    persist(
        (set, get) => ({
            profiles: PROFILES,

            /**
             * 2. 특정 유저의 이메일로 프로필 사진 정보 가져오기
             * @param {string} email - 유저의 고유 이메일
             * @returns {object|null} 매칭되는 프로필 객체 또는 없을 경우 null
             */
            getUserProfile: (email) => {
                if (!email) return null; // 이메일이 없으면 바로 null 리턴

                // 매핑 테이블에서 이메일 검색
                const userMapping = get().profiles.find((p) => p.email === email);
                if (!userMapping) return null; // 매핑 데이터가 없어도 null 리턴

                // 원본 데이터에서 최종 객체 반환 (혹시 모를 예외 방어로 || null 처리)
                return DEFAULT_PROFILES.find((d) => d.id === userMapping.profileId) || null;
            },

            /**
             * 3. 유저의 프로필 이미지 등록 및 변경
             */
            setUserProfile: (email, profileId) => set((state) => {
                if (!email) return {};

                const exists = state.profiles.some((p) => p.email === email);

                let updatedProfiles;
                if (exists) {
                    updatedProfiles = state.profiles.map((p) =>
                        p.email === email ? { ...p, profileId: Number(profileId) } : p
                    );
                } else {
                    updatedProfiles = [
                        ...state.profiles,
                        { email, profileId: Number(profileId) }
                    ];
                }

                return { profiles: updatedProfiles };
            }),
        }),
        {
            name: "user-profile-storage",
        }
    )
);

export default useProfileStore;