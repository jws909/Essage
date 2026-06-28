import { create } from "zustand";
import { persist } from "zustand/middleware";
import EVENTS from "../data/eventData";

const useEventStore = create(
    persist(
        (set, get) => ({
            events: EVENTS,

            // 일정 추가
            addEvent: (date, event) =>
                set((state) => {
                    const prev = state.events[ date ] || [];

                    // id 없으면 자동 생성 (안전장치)
                    const newEvent = {
                        id: crypto.randomUUID(),
                        ...event,
                    };

                    return {
                        events: {
                            ...state.events,
                            [ date ]: [ ...prev, newEvent ],
                        },
                    };
                }),

            // 일정 삭제 (id 기반)
            removeEvent: (date, id) =>
                set((state) => {
                    const prev = state.events[ date ] || [];

                    const updated = prev.filter((event) => event.id !== id);

                    const newEvents = { ...state.events };

                    if (updated.length === 0) {
                        delete newEvents[ date ];
                    } else {
                        newEvents[ date ] = updated;
                    }

                    return { events: newEvents };
                }),

            // 특정 날짜 이벤트 가져오기
            getEventsByDate: (date) => {
                return get().events[ date ] || [];
            },

            // 초기화
            resetEvents: () => set({ events: EVENTS }),
        }),
        {
            name: "calendar-events",
        }
    )
);

export default useEventStore;