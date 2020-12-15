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
        window.location.replace("/storefront");
    })//.catch(err => {
    //     console.log(err);
    //     alert("Error: " + err);
    // });
});