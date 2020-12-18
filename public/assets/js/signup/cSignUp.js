$("#signUp").on("submit", event => {
    event.preventDefault();
    const userInfo = {
        email: $("#emailInput").val().trim(),
        password: $("#passwordInput").val().trim(),
        first_name: $("#firstNameInput").val().trim(),
        last_name: $("#lastNameInput").val().trim()
    };
    if (!userInfo.email || !userInfo.password || !userInfo.first_name || !userInfo.last_name) {
        return;
    };

    $.post("/api/signup", userInfo).then(() => {
        alert("Account created! Please login.");
        window.location.replace("/");
    });
});