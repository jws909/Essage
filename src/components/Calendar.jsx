import { useEffect, useState } from "react";
import '../css/Calendar.css'
import Badge from "react-bootstrap/Badge";
import { categoryColor, badgeTheme } from "../data/eventStyle";
import useEventStore from "../store/useEventStore";

function Calendar({ calendarDays }) {

    const events = useEventStore((state) => state.events);
    const getEventsByDate = useEventStore((state) => state.getEventsByDate);
    const addEvent = useEventStore((state) => state.addEvent);
    const removeEvent = useEventStore((state) => state.removeEvent);

    const dayOfWeek = [ '일', '월', '화', '수', '목', '금', '토' ];

    return (
        <div className="rounded-4 border p-3 p-sm-4 bg-body">
            <div className="row row-cols-7 g-1 g-sm-2">
                {
                    dayOfWeek.map((day, index) => {
                        let color = "";

                        if (day == '일') {
                            color = "text-danger";
                        } else if (day == '토') {
                            color = "text-primary";
                        } else {
                            color = "text-muted";
                        }

                        return (
                            <div className={"pb-2 text-center fw-semibold small " + color} key={index}>
                                {day}
                            </div>
                        )
                    })
                }
            </div>
            <div className="row row-cols-7 g-1 g-sm-2">
                {
                    calendarDays.map((calendarDay, index) => {
                        if (!calendarDay) {
                            return (
                                <div className="col" key={index}>
                                    <div className="border rounded-3 bg-body p-1 p-sm-2 min-h-box"></div>
                                </div>
                            );
                        }

                        const dayEvents = getEventsByDate(calendarDay.date);

                        return (
                            <div className="col" key={calendarDay.date}>
                                <div className="border rounded-3 bg-body p-1 p-sm-2 min-h-box">
                                    <span className="fw-medium">{calendarDay.day}</span>

                                    <div className="mt-1 d-flex flex-column gap-1">
                                        {dayEvents.map((evt, i) => (
                                            <Badge
                                                key={i}
                                                bg="undefined"
                                                className="fw-medium text-truncate"
                                                style={{
                                                    fontSize: "12px",
                                                    color: badgeTheme[ categoryColor[ evt.color ] ].text,
                                                    backgroundColor: badgeTheme[ categoryColor[ evt.color ] ].bg,
                                                    borderRadius: "4px",
                                                }}
                                            >
                                                {evt.text}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Calendar;