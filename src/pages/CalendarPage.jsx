import { useEffect, useState } from 'react';
import '../css/CalendarPage.css'
import Calendar from '../components/Calendar';
import { CalendarPlus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button';

function CalendarPage() {

    const [ calendar, setCalendar ] = useState({
        year: 0,
        month: 0,
        lastDay: 0,
        firstDayWeek: 0,
    });

    const [ calendarDays, setCalendarDays ] = useState([]);

    useEffect(() => {
        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth();

        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayWeek = new Date(year, month, 1).getDay();

        setCalendar({
            year,
            month: month + 1,
            lastDay,
            firstDayWeek,
        });

        const days = [];
        // 앞 빈칸
        for (let i = 0; i < firstDayWeek; i++) {
            days.push(null);
        }

        // 날짜
        for (let i = 1; i <= lastDay; i++) {
            days.push(i);
        }

        setCalendarDays(days);
    }, []);

    return (
        <div>
            <header className="mb-5">
                <h1 className="custom-heading fw-bold text-body">우리 팀 일정 관리</h1>
                <p className="mt-2 small text-muted"
                    style={{ lineHeight: 1.625 }}>
                    팀원들과 함께하는 회의, 마감, 이벤트를 한눈에 확인하고 새로운 일정을 등록해 보세요.
                </p>
            </header>
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <h2 className="fw-bold text-body" style={{ fontSize: "18px" }}>
                            {calendar.year + "년 " + calendar.month + "월"}
                        </h2>
                    </div>
                    <Calendar calendarDays={calendarDays} />
                </div>
                <div className="col-12 col-lg-4">
                    <form className="border bg-body p-4 sticky-sm"
                        style={{ borderRadius: "1rem" }}>
                        <div className="mb-4 d-flex align-items-center gap-2">
                            <CalendarPlus size={20} className="text-primary" />
                            <h2 className="fs-6 fw-bold text-body">새로운 일정 등록</h2>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="event-date" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>날짜</label>
                            <input id="event-date" type="date"
                                className="form-control custom-date-input"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="event-title" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>일정 제목</label>
                            <input id="event-title" type="text" placeholder="예) 정기 회의"
                                className="form-control custom-text-input"></input>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="event-desc" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>일정 설명</label>
                            <textarea id="event-desc" rows={4} placeholder="일정에 대한 간단한 설명을 입력하세요."
                                className="form-control custom-textarea"></textarea>
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 custom-submit-btn"
                        >
                            <CalendarPlus size={16} />
                            일정 등록
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;