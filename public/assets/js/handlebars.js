$(document).ready(() => {

    $("#prod-cart").on("click", event => {
        let data = {
            userid: $(event.currentTarget).data("userid"),
            productid: $(event.currentTarget).data("productid")
        };
        if ($("#prod-quantity").val()) {
            data.quantity = parseInt($("#prod-quantity").val());
        } else {
            data.quantity = 1;
        };
        $.ajax({
            url: "/api/cart",
            method: "POST",
            data: data
        }).then(result => {
            alert("Added item to your cart!");
        });
    });

})
    