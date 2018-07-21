$('body').scrollspy({target: "#mainNav", offset: 54});

$("#mainNav a").on('click', function (event) {
    if (this.hash !== "") {
        $('#navbarResponsive').collapse('hide');
        event.preventDefault();
        let hash = this.hash;
        $('html, body').animate({
            scrollTop: ($(hash).offset().top - 54)
        }, 500, function () {
            if (history.pushState) {
                history.pushState(null, null, hash);
            }
            else {
                window.location.hash = hash;
            }
        });
    }
});
