function addButtomShadowNavbar(classAdded) {
    if ($(window).scrollTop() > 1) {
        $("nav.navbar").addClass("scrolled");
        $("body").addClass("scrolled");
        classAdded = !classAdded;
    }
    $(window).on("scroll", () => {
        let scrollTop = $(window).scrollTop();

        if (scrollTop > 1 && !classAdded) {
            $("nav.navbar").addClass("scrolled");
            $("body").addClass("scrolled");
            classAdded = !classAdded;
        } else if (scrollTop <= 1 && classAdded) {
            $("nav.navbar").removeClass("scrolled");
            $("body").removeClass("scrolled");
            classAdded = !classAdded;
        }
    });
}

function progressBar() {
    let scroll = $(window).scrollTop();
    const height = $(window).height();
    const width = $(window).width();
    let percentage = scroll / ($(document).height() - height);
    $(".progress-bar__moving").width(percentage * width);

    $(window).on("scroll", () => {
        scroll = $(window).scrollTop();
        percentage = scroll / ($(document).height() - height);
        $(".progress-bar__moving").width(percentage * width);
    });
}

function loadingAnimate() {
    setTimeout(() => {
        $(".loading-bar").slideUp(100);
    }, 1000);
    setTimeout(() => {
        $("body").addClass("loaded");
    }, 100);
}

function navbarToggle() {
    $("#nav-icon").click(function () {
        $(this).toggleClass("open");
        if (!$("#nav-links-toggle").hasClass("open")) {
            $("#nav-links-toggle").toggleClass("show");
            setTimeout(() => {
                $("#nav-links-toggle").toggleClass("open");
            }, 5);
        } else {
            $("#nav-links-toggle").toggleClass("open");
            setTimeout(() => {
                $("#nav-links-toggle").toggleClass("show");
            }, 400);
        }
    });
}

function toSideBar() {
    if ($(window).width() > 768) {
        $("body").removeClass("collapsed-side-nav");
    }
    $(".side-nav__head").on("click", function () {
        $("body").toggleClass("collapsed-side-nav");
    });
}

function handleTextAreaBR() {
    $("body").on("input", ".form-reg__group>textarea", function () {
        const parent = $(this).closest(".form-reg__group");
        const newval = $(this)
            .val()
            .replace(/\r\n|\r|\n/g, "<br />");
        parent.find(".value>textarea").val(newval);
    });
}
function updateNavbarCart(quantity, price) {
    const container = $(".nav-cart-quantity__container");
    const quantitySpan = $(".nav-cart-quantity__container span");
    const priceSpan = $(".cart-price__number");
    if (quantity < 1) {
        container.removeClass("counted");
        quantitySpan.html(0);
        priceSpan.html(0);
    } else {
        container.addClass("counted");
        quantitySpan.html(quantity);
        priceSpan.html(price);
    }
}
function handleUpdateCartButton(
    productId,
    cartId,
    quantity,
    button,
    success = () => null,
    process = "plus"
) {
    const currentButtonHtml = button.html();
    const loadingPlaceHolder = $("#laoding__placeholder").html();

    if (loadingPlaceHolder === currentButtonHtml) {
        return;
    }

    button.html(loadingPlaceHolder);
    $.ajax({
        url: "aj/update_cart.php",
        type: "POST",
        data: {
            process,
            productId,
            cartId,
            quantity,
        },
        success: function (r) {
            const result = JSON.parse(r);
            Swal.fire({
                title: "Ø¹Ù…Ù„ÙŠØ© Ù†Ø§Ø¬Ø­Ø©",
                text: result.message,
                icon: "success",
                confirmButtonText: "Ø²ÙŠ Ø§Ù„ÙÙ„",
            });
            updateNavbarCart(result.totalQuantity, result.totalPrice);
            success(result);
        },
        error: (e) => {
            const message = JSON.parse(e.responseText.trim());
            Swal.fire({
                title: "Ø­Ø¯Ø« Ø®Ø·Ø£",
                text: message.error,
                icon: "error",
                confirmButtonText: e.status == 401 ? "Ø§Ø¯Ø®Ù„ Ù„Ø­Ø³Ø§Ø¨Ùƒ" : "Ø­Ø§ÙˆÙ„ ØªØ§Ù†ÙŠ !",
            }).then((result) => {
                e.status == 401 ? (window.location.href = "/login.php") : "";
            });
        },
    }).then(() => {
        setTimeout(() => {
            button.html(currentButtonHtml);
        }, 300);
    });
}
$(function () {
    if (typeof isMain !== "undefined" || typeof isCourses !== "undefined") {
        if (typeof isCourses === "undefined") {
        }
    }
    if (typeof isAdmin !== "undefined") {
        toSideBar();
        toTop();
    }

    let classAdded = false;
    addButtomShadowNavbar(classAdded);
    navbarToggle();
    progressBar();
    loadingAnimate();
    handleTextAreaBR();
});