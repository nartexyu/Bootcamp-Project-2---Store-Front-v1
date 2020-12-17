$("#storelogin").on("submit", event => {
    event.preventDefault();
    const userInfo = {
        email: $("#emailInput").val().trim(),
        password: $("#passwordInput").val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
        return;
    };
    $.post("/api/login", userInfo).then(response => {
        window.location = "/landing/" + response.id;
    });
});