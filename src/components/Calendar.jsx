import { useEffect, useState } from "react";
import '../css/Calendar.css'
import Badge from "react-bootstrap/Badge";

function Calendar({calendarDays}) {

    const dayOfWeek = [ '일', '월', '화', '수', '목', '금', '토' ];

    const categoryColor = {
        meeting: "primary", //회의
        task: "secondary",  //작업
        progress: "info",   //진행 중
        done: "success",    //완료
        hold: "warning",    //보류
        urgent: "danger",   //긴급
        social: "social"    //소셜
    };

    const badgeTheme = {
        primary: {
            bg: "rgba(13,110,253,0.15)",
            text: "#0d6efd",
            border: "rgba(13,110,253,0.3)",
        },

        secondary: {
            bg: "rgba(108,117,125,0.15)",
            text: "#495057",
            border: "rgba(108,117,125,0.3)",
        },

        success: {
            bg: "rgba(25,135,84,0.15)",
            text: "#198754",
            border: "rgba(25,135,84,0.3)",
        },

        info: {
            bg: "rgba(13,202,240,0.25)",
            text: "#087990",
            border: "rgba(13,202,240,0.4)",
        },

        warning: {
            bg: "rgba(255,193,7,0.25)",
            text: "#997404",
            border: "rgba(255,193,7,0.4)",
        },

        danger: {
            bg: "rgba(220,53,69,0.15)",
            text: "#b02a37",
            border: "rgba(220,53,69,0.3)",
        },

        social: {
            bg: "rgba(255,105,180,0.2)",
            text: "#c2185b",
            border: "rgba(255,105,180,0.35)",
        },
    };

    let event = {
        "3": [
            { text: "기획 회의", color: "meeting" }
        ],
        "8": [
            { text: "와이어프레임 제작", color: "task" }
        ],
        "13": [
            { text: "정기 회의", color: "meeting" },
            { text: "회식", color: "social" }
        ],
        "14": [
            { text: "등산", color: "urgent" },
            { text: "회식", color: "social" }
        ],
        "25": [
            { text: "1차 배포", color: "progress" }
        ]
    };

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
                    calendarDays.map((day, index) => {
                        const dayEvents = event[ day ] || [];

                        return (
                            <div className="col" key={index}>
                                <div className="border rounded-3 bg-body p-1 p-sm-2 min-h-box">
                                    <span className="fw-medium text-body custom-text">{day}</span>
                                    <div className="mt-1 d-flex flex-column gap-1">
                                        {
                                            dayEvents.map((evt, i) => (
                                                <Badge
                                                    key={i}
                                                    bg="undefined"
                                                    className="fw-medium text-truncate"
                                                    style={{
                                                        fontSize: "12px",
                                                        color: badgeTheme[ categoryColor[ evt.color ] ].text,
                                                        backgroundColor: badgeTheme[ categoryColor[ evt.color ] ].bg,
                                                        borderRadius: "4px"
                                                    }}
                                                >
                                                    {evt.text}
                                                </Badge>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Calendar;