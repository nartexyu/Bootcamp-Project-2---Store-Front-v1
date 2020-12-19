$("#login").on("submit", event => {
    event.preventDefault();
    const userInfo = {
        email: $("#emailInput").val().trim(),
        password: $("#passwordInput").val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
        alert("Please enter your email and password.");
        return;
    };
    $.post("/api/login", userInfo).then(response => {
        window.location = "/landing/" + response.id;
    });
});

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
            alert("Congratulations on creating your new store! Please proceed to the store editor.");
            window.location = "/storeEditor/" + response.id;
        };
    });
});

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

$("#storeform").on("submit", event => {
    event.preventDefault();
    let storeInfo = {
        store: {
            store_name: $("#storeNameInput").val().trim()
        },
        user: {
            email: $("#emailInput").val().trim(),
            password: $("#passwordInput").val().trim(),
            first_name: $("#firstNameInput").val().trim(),
            last_name: $("#lastNameInput").val().trim()
        }
    };
    $.ajax({
        url: "/api/store",
        type: "POST",
        data: storeInfo
    }).then(response => {
        alert("Account created! Please login.");
        window.location = "/osignin";
    });
});