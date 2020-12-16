$(".prod-pic").on("click", event => {
    console.log($(event.currentTarget).data("productid"));
    let id = $(event.currentTarget).data("productid");
    window.location = "/api/product/" + id;
});