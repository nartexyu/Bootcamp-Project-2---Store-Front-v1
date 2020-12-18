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
        console.log(response.id);
        window.location = "/";
    });
});