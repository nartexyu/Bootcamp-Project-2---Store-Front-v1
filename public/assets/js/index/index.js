$("#login").on("submit", event => {
    event.preventDefault();
    const userInfo = {
        email: $("#emailInput").val().trim(),
        password: $("#passwordInput").val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
        return;
    };
    $.post("/api/login", userInfo).then(() => {
        window.location = "/landing";
    });
});

const modal = () => {
    $("#modal").css("display", "block");
};

$(".nav-link").on("click", () => {
    modal();
});