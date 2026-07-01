import React, { useState } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import { TEAM_CATEGORIES } from '../data/teamData';
import { Tools } from 'react-bootstrap-icons';

function TeamCreateForm({ isOpen, onClose, onCreate }) {
    // 폼 입력 상태 관리
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState('Dev');
    const [ description, setDescription ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !name.trim()) {
            alert('워크스페이스 이름을 입력해 주세요.');
            return;
        }

        // 부모 컴포넌트가 전달한 스토어 액션 실행
        onCreate(name.trim(), category, description.trim());

        // 폼 초기화 및 닫기
        setName('');
        setCategory('Dev');
        setDescription('');
        onClose();
    };

    return (
        <Collapse in={isOpen}>
            <div className="w-100 mb-4 mx-auto p-4 border rounded-4 bg-body shadow-sm text-start" style={{ maxWidth: "600px" }}>
                <h5 className="fw-bold mb-3 text-body"><Tools className='text-primary'/> 새 워크스페이스 개설</h5>
                <Form onSubmit={handleSubmit}>
                    {/* 1. 팀 이름 입력 */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-semibold text-secondary">워크스페이스 이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="개설할 팀 이름을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    {/* 2. 카테고리 선택 (라디오 버튼) */}
                    <Form.Group className="mb-3">
                        <Form.Label className="d-block small fw-semibold text-secondary mb-2">카테고리</Form.Label>
                        <div className="d-flex flex-wrap gap-3">
                            {TEAM_CATEGORIES.map((cat) => (
                                <Form.Check
                                    key={cat}
                                    type="radio"
                                    label={cat}
                                    name="teamCategory"
                                    id={`create-cat-${cat}`}
                                    checked={category === cat}
                                    onChange={() => setCategory(cat)}
                                    className="small"
                                />
                            ))}
                        </div>
                    </Form.Group>

                    {/* 3. 설명 입력 */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-semibold text-secondary">간단한 설명 (선택)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="팀에 대한 설명을 적어주세요"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: 'none' }}
                        />
                    </Form.Group>

                    {/* 4. 액션 버튼 */}
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary" className="btn-sm rounded-3 px-3" onClick={onClose}>
                            취소
                        </Button>
                        <Button variant="primary" className="btn-sm rounded-3 px-3" type="submit">
                            워크스페이스 생성
                        </Button>
                    </div>
                </Form>
            </div>
        </Collapse>
    );
}

export default TeamCreateForm;