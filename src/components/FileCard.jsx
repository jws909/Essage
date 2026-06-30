import "../css/FileCard.css";
import { FileEarmarkText, Download, Trash } from "react-bootstrap-icons";
import useArchiveStore from "../store/useArchiveStore";

function FileCard({ file }) {

    const removeFile = useArchiveStore((s) => s.removeFile);

    const handleDelete = () => {

        if (window.confirm("이 자료를 삭제하시겠습니까?")) {
            removeFile(file.id);
        }

    };

    return (

        <div className="file-card">

            <div className="file-left">

                <FileEarmarkText className="fileIcon" />

                <div className="file-info">

                    <h3>{file.title}</h3>

                    <span>

                        {file.size} · {file.date} 등록

                    </span>

                    <p>작성자 : {file.writer}</p>

                </div>

            </div>

            <div className="file-right">
                <button className="btn-download" onClick={(e) => {
                    e.stopPropagation();
                    if (!file.file) {
                        alert("다운로드 할 파일이 없습니다.");
                        return;
                    }

                    const url = URL.createObjectURL(file.file);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = file.file.name;
                    a.click();

                    URL.revokeObjectURL(url);

                }}>
                    <Download /> 다운로드 </button>

                <button
                    className="btn-delete"
                    onClick={handleDelete}
                >

                    <Trash />

                    삭제

                </button>

            </div>

        </div>

    );

}

export default FileCard;