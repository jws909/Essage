export const categoryColor = {
    meeting: "primary", //회의
    task: "secondary",  //작업
    progress: "info",   //진행 중
    done: "success",    //완료
    hold: "warning",    //보류
    urgent: "danger",   //긴급
    social: "social"    //소셜
};

export const getCategoryLabel = (key) => {
    const labels = {
        meeting: "회의",
        task: "작업",
        progress: "진행 중",
        done: "완료",
        hold: "보류",
        urgent: "긴급",
        social: "소셜",
    };

    return labels[key] ?? key;
};

export const badgeTheme = {
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