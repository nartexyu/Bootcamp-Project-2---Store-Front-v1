$("#storelogin").on("submit", event => {
    event.preventDefault();
    const userInfo = {
        email: $("#emailInput").val().trim(),
        password: $("#passwordInput").val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
        alert("Please enter your email and password");
    };
    $.post("/api/login", userInfo).then(response => {
        if (!response.isSeller) {
            alert("No store owner account on file. Please create a store account or proceed to the customer login page.");
        } else {
            window.location = "/landing/" + response.id;
        };
    });
});