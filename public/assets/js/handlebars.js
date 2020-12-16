$(".prod-pic").on("click", event => {
    console.log($(event.currentTarget).data("productid"));
    let id = $(event.currentTarget).data("productid");
    window.location = "http://localhost:8080/api/product/" + id;
});