import { useEffect, useState } from 'react';
import '../css/CalendarPage.css'
import Calendar from '../components/Calendar';
import { CalendarPlus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button';
import LeftButton from '../components/LeftButton';
import RightButton from '../components/RightButton';
import { categoryColor, getCategoryLabel } from "../data/eventStyle";
import useEventStore from '../store/useEventStore';
import { useParams } from 'react-router';

function CalendarPage() {
    const addEvent = useEventStore((state) => state.addEvent);

    const [ selectedDate, setSelectedDate ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ desc, setDesc ] = useState("");

    const { teamId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedDate || !title || !category || !desc) return;

        addEvent(selectedDate, {
            text: title,
            teamId: Number(teamId),
            color: category,
            description: desc,
        });

        // 초기화
        setSelectedDate("");
        setTitle("");
        setCategory("");
        setDesc("");
    };

    const [ calendar, setCalendar ] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(), // 0부터 시작
    });

    const [ calendarDays, setCalendarDays ] = useState([]);

    useEffect(() => {
        const { year, month } = calendar;

        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayWeek = new Date(year, month, 1).getDay();

        const days = [];

        for (let i = 0; i < firstDayWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= lastDay; day++) {
            days.push({
                day,
                date: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
            });
        }

        setCalendarDays(days);
    }, [ calendar.year, calendar.month ]);

    // 이전 달로 이동
    const prevMonth = () => {
        setCalendar((prev) => {
            const date = new Date(prev.year, prev.month - 1);

            return {
                year: date.getFullYear(),
                month: date.getMonth(),
            };
        });
    };

    // 다음 달로 이동
    const nextMonth = () => {
        setCalendar((prev) => {
            const date = new Date(prev.year, prev.month + 1);

            return {
                year: date.getFullYear(),
                month: date.getMonth(),
            };
        });
    };

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
                        <LeftButton onClick={prevMonth} />
                        <h2 className="fw-bold text-body" style={{ fontSize: "18px" }}>
                            {calendar.year + "년 " + (calendar.month + 1) + "월"}
                        </h2>
                        <RightButton onClick={nextMonth} />
                    </div>
                    <Calendar
                        teamId={teamId}
                        calendarDays={calendarDays}
                        selectedDate={selectedDate}
                        onDateClick={setSelectedDate}
                    />
                </div>
                <div className="col-12 col-lg-4">
                    <form className="border bg-body p-4 sticky-sm" onSubmit={handleSubmit}
                        style={{ borderRadius: "1rem" }}>
                        <div className="mb-4 d-flex align-items-center gap-2">
                            <CalendarPlus size={20} className="text-primary" />
                            <h2 className="fs-6 fw-bold text-body">새로운 일정 등록</h2>
                        </div>

                        {/* 날짜 */}
                        <div className="mb-3">
                            <label htmlFor="event-date" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>날짜</label>
                            <input
                                id="event-date"
                                type="date"
                                className="form-control custom-date-input"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        {/* 제목 */}
                        <div className="mb-3">
                            <label htmlFor="event-title" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>일정 제목</label>
                            <input
                                id="event-title"
                                type="text"
                                placeholder="예) 정기 회의"
                                className="form-control custom-text-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* 카테고리 */}
                        <div className="mb-3">
                            <label
                                htmlFor="event-category"
                                className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}
                            >
                                카테고리
                            </label>

                            <select
                                id="event-category"
                                className="form-select custom-text-input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>
                                    카테고리를 선택하세요
                                </option>
                                {Object.keys(categoryColor).map((key) => (
                                    <option key={key} value={key}>
                                        {getCategoryLabel(key)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 설명 */}
                        <div className="mb-5">
                            <label htmlFor="event-desc" className="d-block fw-semibold text-body mb-1"
                                style={{ fontSize: "0.875rem" }}>일정 설명</label>
                            <textarea
                                id="event-desc"
                                rows={4}
                                placeholder="일정에 대한 간단한 설명을 입력하세요."
                                className="form-control custom-textarea"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        {/* 제출 버튼 */}
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