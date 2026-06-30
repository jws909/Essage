
let COMMENTS = [
    // 💻 1번 게시글 댓글 (개발팀)
    {
        postId: 1,
        id: 1,
        author: "lion@gmail.com",
        timestamp: "2026-06-15 14:20",
        text: "첫걸음 응원합니다! 컴포넌트 분리부터 익히면 나중에 정말 편해져요.",
    },
    {
        postId: 1,
        id: 2,
        author: "apeach@gmail.com",
        timestamp: "2026-06-15 15:02",
        text: "저도 처음엔 한 파일에 다 넣었는데, 나누고 나니 유지보수가 훨씬 쉽더라고요.",
    },
    {
        postId: 1,
        id: 3,
        author: "muzi@gmail.com",
        timestamp: "2026-06-15 16:45",
        text: "공식 문서랑 같이 작은 예제를 따라 만들어 보는 걸 추천드려요. 화이팅!",
    },

    // 💻 2번 게시글 댓글 (개발팀)
    {
        postId: 2,
        id: 4,
        author: "chunsik@gmail.com",
        timestamp: "2026-06-16 18:10",
        text: "저도 처음에 헷갈렸는데 공식 문서 예제가 도움이 많이 됐어요!"
    },
    {
        postId: 2,
        id: 5,
        author: "frodo@gmail.com",
        timestamp: "2026-06-16 19:25",
        text: "의존성 배열은 꼭 직접 실습해보면서 익히는 걸 추천합니다."
    },

    // 💻 3번 게시글 댓글 (개발팀)
    {
        postId: 3,
        id: 6,
        author: "neo@gmail.com",
        timestamp: "2026-06-17 13:41",
        text: "축하드립니다! API 연동 성공하면 정말 뿌듯하죠 😄"
    },
    {
        postId: 3,
        id: 7,
        author: "muzi@gmail.com",
        timestamp: "2026-06-17 14:07",
        text: "다음 단계로는 로딩 상태랑 에러 처리도 도전해보세요!"
    },

    // 💻 4번 게시글 댓글 (개발팀)
    {
        postId: 4,
        id: 8,
        author: "lion@gmail.com",
        timestamp: "2026-06-18 10:18",
        text: "커밋 메시지 구체적으로 작성하는 습관 정말 중요한 것 같아요."
    },
    {
        postId: 4,
        id: 9,
        author: "apeach@gmail.com",
        timestamp: "2026-06-18 11:52",
        text: "좋은 정보 감사합니다. 팀원들과도 공유해야겠네요."
    },

    // 💻 5번 게시글 댓글 (개발팀)
    {
        postId: 5,
        id: 10,
        author: "chunsik@gmail.com",
        timestamp: "2026-06-19 16:03",
        text: "저는 기능 단위로 폴더를 나누는 방식을 선호합니다."
    },
    {
        postId: 5,
        id: 11,
        author: "frodo@gmail.com",
        timestamp: "2026-06-19 17:22",
        text: "공통 컴포넌트는 따로 components/common 폴더에 관리하고 있어요."
    },
    {
        postId: 5,
        id: 12,
        author: "muzi@gmail.com",
        timestamp: "2026-06-19 18:40",
        text: "프로젝트 규모에 따라 정답은 없는 것 같습니다!"
    },

    // 💻 6번 게시글 댓글 (개발팀)
    {
        postId: 6,
        id: 13,
        author: "lion@gmail.com",
        timestamp: "2026-06-20 20:14",
        text: "회고 문화가 있는 팀은 확실히 성장 속도가 빠른 것 같아요."
    },
    {
        postId: 6,
        id: 14,
        author: "apeach@gmail.com",
        timestamp: "2026-06-20 20:45",
        text: "소통의 중요성에 공감합니다. 좋은 회고였겠네요!"
    },

    // 🎨 7번 게시글 댓글 (디자인팀)
    {
        postId: 7,
        id: 15,
        author: "lion@gmail.com",
        timestamp: "2026-06-22 23:11",
        text: "컬러 톤이 깔끔해서 컴포넌트 짤 때 스타일 정의하기 편하겠네요. 고생하셨습니다!"
    },

    // 🎨 8번 게시글 댓글 (디자인팀)
    {
        postId: 8,
        id: 16,
        author: "neo@gmail.com",
        timestamp: "2026-06-24 10:05",
        text: "모바일 환경에서는 가독성이 제일 중요하니 텍스트를 가리는 아이콘은 display: none 처리하는 게 좋아 보여요."
    },
    {
        postId: 8,
        id: 17,
        author: "chunsik@gmail.com",
        timestamp: "2026-06-24 11:30",
        text: "의견 감사합니다! 미디어 쿼리 적용해서 모바일 뷰에서는 깔끔하게 숨기도록 구현할게요."
    },

    // 🎨 9번 게시글 댓글 (디자인팀)
    {
        postId: 9,
        id: 18,
        author: "neo@gmail.com",
        timestamp: "2026-06-25 15:42",
        text: "맞아요, 다크모드 컴포넌트 스위칭할 때 Variables만큼 편한 게 없죠 유용하게 씁시다!"
    }
];

export let lastCommentId = 18; // 마지막 ID 업데이트

export default COMMENTS;