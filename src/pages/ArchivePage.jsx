import { useState } from "react";
import '../css/ArchivePage.css'
import {CheckCircle,FileEarmarkText,Download} from "react-bootstrap-icons";

function Archive() {
    const [tab, setTab] = useState("rule");

    return (
        <div className="archive-page">
            <h1 className="title">팀 규칙 및 자료실</h1>

            <p className="description">
                아래 탭에서 우리 팀이 함께 지키기로 한 규칙을 확인하고,
                공유 자료실에서 필요한 파일을 내려받으세요. 모든 팀원은 규칙을 숙지한 뒤 프로젝트에 참여해 주세요.
            </p>

            <div className="tab-menu">
                <button
                    className={tab === "rule" ? "active" : ""}
                    onClick={() => setTab("rule")}
                >
                    우리 팀 규칙
                </button>

                <button
                    className={tab === "file" ? "active" : ""}
                    onClick={() => setTab("file")}
                >
                    공유 자료실
                </button>
            </div>

            {tab === "rule" ? (
                <div className="content">
                    <div className="rule-card">
                        <div className="number">1</div>
                        <div>
                            <h3> <CheckCircle style={{ color: "#2563eb" }}/> 회의 시간 5분 전 참여하기</h3>
                            <p>모든 정기 회의는 시작 5분 전까지 입장하여 준비를 마칩니다.</p>
                        </div>
                    </div>

                    <div className="rule-card">
                        <div className="number">2</div>
                        <div>
                            <h3> <CheckCircle style={{ color: "#2563eb" }}/>진행 상황 공유하기</h3>
                            <p>매일 작업 종료 전 담당 업무의 진행 상황을 팀 채널에 남깁니다.</p>
                        </div>
                    </div>

                    <div className="rule-card">
                        <div className="number">3</div>
                        <div>
                            <h3> <CheckCircle style={{ color: "#2563eb" }}/> 서로 존중하며 소통하기</h3>
                            <p>의견이 다를 때는 근거를 들어 정중하게 이야기합니다.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content">
                    
                    <div className="file-card">
                        <FileEarmarkText className="fileIcon"/>
                        <div>
                            <h3>팀_프로젝트_기획서.pdf</h3>
                            <span>2.4MB · 2025-06-01 등록</span>
                        </div>
                        <button className="btn-download"><Download/> 다운로드</button>
                    </div>

                    <div className="file-card">
                        <FileEarmarkText className="fileIcon"/>
                        <div>
                            <h3>와이어프레임_v2.fig</h3>
                            <span>8.1MB · 2025-06-08 등록</span>
                        </div>
                        <button className="btn-download"><Download/> 다운로드</button>
                    </div>

                    <div className="file-card">
                        <FileEarmarkText className="fileIcon"/>
                        <div>
                            <h3>회의록_06월_2주차.docx</h3>
                            <span>320KB · 2025-06-12 등록</span>
                        </div>
                        <button className="btn-download"><Download/> 다운로드</button>
                    </div>

                    <div className="file-card">
                        <FileEarmarkText className="fileIcon"/>
                        <div>
                            <h3>디자인_가이드.zip</h3>
                            <span>15.6MB · 2025-06-14 등록</span>
                        </div>
                        <button className="btn-download"><Download/> 다운로드</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Archive;