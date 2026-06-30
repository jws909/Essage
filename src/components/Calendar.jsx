import { useEffect, useState } from "react";
import '../css/Calendar.css'
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { categoryColor, badgeTheme } from "../data/eventStyle";
import useEventStore from "../store/useEventStore";

function Calendar({ teamId, calendarDays, selectedDate, onDateClick }) {

    const MAX_VISIBLE = 2;
    const [ expandedDate, setExpandedDate ] = useState(null);
    const toggleExpand = (date) => {
        setExpandedDate(prev => prev === date ? null : date);
    };

    const events = useEventStore((state) => state.events);
    const getEventsByDate = useEventStore((state) => state.getEventsByDate);

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

                        const allDayEvents = getEventsByDate(calendarDay.date);
                        
                        const numericTeamId = Number(teamId);
                        const dayEvents = allDayEvents.filter(
                            (event) => Number(event.teamId) === numericTeamId
                        );

                        const isExpanded = expandedDate === calendarDay.date;

                        const visibleEvents = isExpanded
                            ? dayEvents
                            : dayEvents.slice(0, MAX_VISIBLE);

                        const hiddenCount = dayEvents.length - MAX_VISIBLE;

                        return (
                            <div className="col" key={calendarDay.date}>
                                <div
                                    className={`calendar-day rounded-3 bg-body p-1 p-sm-2 
                                                min-h-box 
                                                ${isExpanded ? "expanded" : ""}
                                                ${selectedDate === calendarDay.date ? "selected-day" : ""}
                                            `}
                                    onClick={() => onDateClick(calendarDay.date)}
                                >
                                    <span className="fw-medium">{calendarDay.day}</span>

                                    <div className="mt-1 d-flex flex-column gap-1">
                                        {visibleEvents.map((evt, i) => (
                                            <OverlayTrigger
                                                key={i}
                                                placement="top"
                                                overlay={
                                                    <Tooltip
                                                        id={`tooltip-${calendarDay.date}-${i}`}
                                                        className="custom-tooltip"
                                                    >
                                                        <div
                                                            style={{ color: "#fff" }}
                                                        >
                                                            {evt.description}
                                                        </div>
                                                    </Tooltip>
                                                }
                                            >
                                                <Badge
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
                                            </OverlayTrigger>
                                        ))}

                                        {hiddenCount > 0 && !isExpanded && (
                                            <div
                                                className="more-badge text-primary small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpand(calendarDay.date);
                                                }}
                                            >
                                                +{hiddenCount} more
                                            </div>
                                        )}
                                        {isExpanded && dayEvents.length > MAX_VISIBLE && (
                                            <div
                                                className="more-badge text-muted small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpand(calendarDay.date);
                                                }}
                                            >
                                                show less
                                            </div>
                                        )}
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