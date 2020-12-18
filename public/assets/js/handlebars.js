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

    $(".cart-delete").on("click", event => {
        let itemid = $(event.currentTarget).data("cartid");
        $.ajax({
            url: "/api/cart/" + itemid,
            method: "DELETE"
        }).then(result => {
            location.reload();
        });
    });

    $(".edit-prod-delete").on("click", event => {
        let itemid = $(event.currentTarget).data("productid");
        $.ajax({
            url: "/api/product/" + itemid,
            method: "DELETE"
        }).then(result => {
            location.reload();
        });
    });

    let amount = 1;

    $("#add").on("click", () => {
        $("#prod-quantity").val(amount);
        amount++;
    });

    $("#subtract").on("click", () => {
        amount -= 1;
        $("#prod-quantity").val(amount);
    });

    let storeid = $("#edit-store-id").data("storeid");

    const updateStore = info => {
        $.ajax({
            url: "/api/store/" + storeid,
            method: "PUT",
            data: info
        }).then(result=> {
            console.log(result);
            alert("Updated store information!");
        });
    };

    $("#bg-image-form").on("submit", event => {
        event.preventDefault();
        let info = {
            bg_scroll: $("#bg-scroll").val(),
            about_scroll: $("#about-scroll").val()
        };
        updateStore(info);
    });

    $("#store-details-form").on("submit", event => {
        event.preventDefault();
        let info = {
            store_name: $("#storeName").val().trim()
        };
        if ($("#storeTagline").val()) {
            info.tagline = $("#storeTagline").val().trim();
        };
        if ($("#aboutDetails").val()) {
            info.about = $("#aboutDetails").val();
        };
        if ($("#storeAddress").val()) {
            info.address = $("#storeAddress").val().trim();
        };
        updateStore(info);
    });

    $("#font-form").on("submit", event => {
        event.preventDefault();
        let info = {};
        if ($("#font-select").val()) {
            info.font = $("#font-select").val();
        };
        if ($("#headerFontColor").val()) {
            info.font_color = $("#headerFontColor").val().trim();
        };
        if ($("#bodyFontColor").val()) {
            info.body_color = $("#bodyFontColor").val().trim();
        };
        if ($("#footerFontColor").val()) {
            info.footer_color = $("#footerFontColor").val().trim();
        };
        updateStore(info);
    });

    $("#color-form").on("submit", event => {
        event.preventDefault();
        let info = {};
        if ($("#storeColor").val()) {
            info.accent_color = $("#storeColor").val().trim();
        };
        updateStore(info);
    });

    document.querySelector("#bg-image").onchange = function(){
        document.querySelector("#bg-edit-name").textContent = this.files[0].name;
      }

    $("#bg-image-upload").on("click", () => {
        const files = $("#bg-image")[0].files;
        let fd = new FormData();
        fd.append('file', files[0]);
        $.ajax({
            url: "/upload/bg-image/" + storeid,
            type: "POST",
            data: fd,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
        }).then(response => {
            alert("Added background photo to your store!");
        });
    });

    document.querySelector("#about-image").onchange = function(){
        document.querySelector("#about-edit-name").textContent = this.files[0].name;
    };

    $("#about-image-upload").on("click", () => {
        const files = $("#about-image")[0].files;
        let fd = new FormData();
        fd.append('file', files[0]);
        $.ajax({
            url: "/upload/about-image/" + storeid,
            type: "POST",
            data: fd,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
        }).then(response => {
            alert("Added photo to your store!");
        });
    });

    document.querySelector("#prod-image-upload").onchange = function(){
        document.querySelector("#prod-image-file").textContent = this.files[0].name;
    };

    $("#prod-form").on("submit", event => {
        event.preventDefault();
        let info = {
            name: $("#productName").val().trim(),
            price: $("#price").val().trim(),
            stock: $("#inventory").val().trim(),
            description: $("#productDescription").val().trim(),
            StoreId: storeid
        };
        if (!$("#prod-image-upload")[0].files){
            alert("Added product to your store!");
            location.reload();
        } else {
            const files = $("#prod-image-upload")[0].files;
            let fd = new FormData();
            fd.append("file", files[0]);
            $.ajax({
                url: "/api/product",
                method: "POST",
                data: info
            }).then(result => {
                let productid = result.id;
                $.ajax({
                    url: "/upload/prod-image/" + productid,
                    type: "POST",
                    data: fd,
                    enctype: "multipart/form-data",
                    processData: false,
                    contentType: false,
                }).then(response => {
                    alert("Added product to your store!");
                    location.reload();
                });
            });
        };
    });

    $(".delete-store").on("click", event => {
        event.preventDefault();
        let storeid = $(event.currentTarget).data("storeid");
        $.ajax({
            url: "/api/store/" + storeid,
            method: "DELETE"
        }).then(response => {
            alert("Sorry this didn't work out.");
            window.location = "/";
        });
    });

});
    