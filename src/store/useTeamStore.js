import { create } from "zustand";
import { persist } from "zustand/middleware";
import TEAMS from "../data/teamData";

const useTeamStore = create(
    persist(
        (set, get) => ({
            teams: TEAMS,
            currentTeamId: null, // 현재 유저가 진입한 팀의 ID

            // 1. 현재 진입할 팀 선택/변경
            setCurrentTeamId: (teamId) => set({ currentTeamId: teamId }),

            // 2. 특정 유저(이메일)가 속한 팀 목록 가져오기
            getTeamsByUserEmail: (email) => {
                if (!email) return [];
                return get().teams.filter((team) => team.members.includes(email));
            },

            // 3. 특정 팀에 새로운 팀원(이메일) 추가하기
            addMemberToTeam: (teamId, email) =>
                set((state) => ({
                    teams: state.teams.map((team) =>
                        team.id === teamId && !team.members.includes(email)
                            ? { ...team, members: [ ...team.members, email ] }
                            : team
                    ),
                })),

            // 4. 새로운 팀 생성하기 (워크스페이스 개설)
            createTeam: (teamName, creatorEmail) =>
                set((state) => {
                    const newId = state.teams.length > 0
                        ? Math.max(...state.teams.map(t => t.id)) + 1
                        : 1;

                    const newTeam = {
                        id: newId,
                        name: teamName,
                        members: [ creatorEmail ], // 생성한 사람은 자동으로 멤버 포함
                    };

                    return {
                        teams: [ ...state.teams, newTeam ],
                        currentTeamId: newId, // 생성 후 해당 팀으로 바로 이동할 수 있게 세팅
                    };
                }),
        }),
        {
            name: "team-storage", // localStorage에 저장될 key
        }
    )
);

export default useTeamStore;