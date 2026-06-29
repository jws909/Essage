import { useState } from "react";
import "../css/ArchivePage.css";
import { CheckCircle,FileEarmarkText,Download } from "react-bootstrap-icons";

import FileCard from "../components/FileCard";
import useArchiveStore from "../store/useArchiveStore";

function ArchivePage() {

    // 탭
    const [tab, setTab] = useState("rule");

    // Zustand
    const files = useArchiveStore((s) => s.files);
    const addFile = useArchiveStore((s) => s.addFile);
    const lastId = useArchiveStore((s) => s.lastId);

    // 자료등록 화면
    const [showUpload, setShowUpload] = useState(false);

    // 입력값
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [size, setSize] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // 오늘 날짜
    function getToday() {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // 자료 등록
    const handleUpload = () => {
        if (!title.trim()) {
            alert("자료명을 입력하세요.");
            return;
        }

        if (!writer.trim()) {
            alert("작성자를 입력하세요.");
            return;
        }

        addFile({
            id: lastId + 1,
            title,
            writer,
            size: size || "-",
            date: getToday(),
            file: selectedFile
        });

        alert("자료가 등록되었습니다.");

        setTitle("");
        setWriter("");
        setSize("");
        setSelectedFile(null);
        setShowUpload(false);

    };

    return (
        <div className="archive-page">
            <h1 className="title">
                팀 규칙 및 자료실
            </h1>

            <p className="description">
                아래 탭에서 우리 팀 규칙을 확인하고 공유 자료실에서 필요한 파일을 내려받으세요.모든 팀원은 규칙을
                숙지한 뒤 프로젝트에 참여해 주세요.
            </p>
            <div className="tab-header">

                <div className="tab-menu">

                    <button
                        className={tab === "rule" ? "active" : ""}
                        onClick={() => {
                            setTab("rule");
                            setShowUpload(false);
                        }}
                    > 우리 팀 규칙 </button>

                    <button
                        className={tab === "file" ? "active" : ""}
                        onClick={() => setTab("file")}
                    > 공유 자료실 </button>

                </div>

                {
                    tab === "file" && (
                        <button
                            className="upload-btn" onClick={() => setShowUpload(true)}
                        > + 자료등록
                        </button>)}
            </div>

            {tab === "rule" ? (

                <div className="content">

                    <div className="rule-card">
                        <div className="number">1</div>
                        <div>
                            <h3><CheckCircle style={{ color: "#2563eb" }} /> 회의 시간 5분 전 참여하기</h3>
                            <p>모든 정기 회의는 시작 5분 전까지 입장하여 준비를 마칩니다.</p>
                        </div>
                    </div>

                    <div className="rule-card">
                        <div className="number">2</div>
                        <div>
                            <h3><CheckCircle style={{ color: "#2563eb" }} /> 진행 상황 공유하기</h3>
                            <p>매일 작업 종료 전 담당 업무의 진행 상황을 팀 채널에 남깁니다.</p>
                        </div>
                    </div>

                    <div className="rule-card">
                        <div className="number">3</div>
                        <div>
                            <h3><CheckCircle style={{ color: "#2563eb" }} /> 서로 존중하며 소통하기</h3>
                            <p>의견이 다를 때는 근거를 들어 정중하게 이야기합니다.</p>
                        </div>
                    </div>

                </div>

            ) : (

                <div className="content">

                    {files.map((file) => (
                        <div className="file-card" key={file.id}>

                            <FileEarmarkText className="fileIcon" />

                            <div>
                                <h3>{file.title}</h3>
                                <span>
                                    {file.size} · {file.date} 등록
                                </span>
                            </div>

                            <button className="btn-download">
                                <Download /> 다운로드
                            </button>

                        </div>
                    ))}

                </div>

            )}
            {
                showUpload && (

                    <div className="upload-card">

                        <h2>자료 등록</h2>

                        <div className="upload-group">

                            <label>자료명</label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="자료명을 입력하세요."
                            />

                        </div>

                        <div className="upload-group">

                            <label>작성자</label>

                            <input
                                type="text"
                                value={writer}
                                onChange={(e) => setWriter(e.target.value)}
                                placeholder="작성자를 입력하세요."
                            />

                        </div>

                        <div className="upload-group">

                            <label>파일 크기</label>

                            <input
                                type="text"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                placeholder="예) 2.4MB"
                            />

                        </div>

                        <div className="upload-group">

                            <label>파일 선택</label>

                            <input
                                type="file"
                                onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                }
                            />

                        </div>

                        <div className="archive-button-area">

                            <button
                                className="archive-cancel-btn"
                                onClick={() => {

                                    setShowUpload(false);

                                    setTitle("");
                                    setWriter("");
                                    setSize("");
                                    setSelectedFile(null);

                                }}
                            >

                                취소

                            </button>

                            <button
                                className="archive-submit-btn"
                                onClick={handleUpload}
                            >

                                등록하기

                            </button>

                        </div>

                    </div>

                )
            }

        </div>


    );

}

export default ArchivePage;