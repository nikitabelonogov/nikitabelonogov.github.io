// Fancy cards
const incline = 10;
$(".perspective-card")
    .mousemove(function (e) {
        let relX = (e.pageX - $(this).offset().left) / $(this).width();
        let relY = (e.pageY - $(this).offset().top) / $(this).height();
        let inclineX = -(relX - .5) * incline;
        const inclineY = (relY - .5) * incline;
        $(this).css('transform',
            'perspective(400px) ' +
            'rotateX(' + inclineY + 'deg) ' +
            'rotateY(' + inclineX + 'deg) ' +
            'scale(1.1)');
    })
    .mouseleave(function (e) {
        $(this).css('transform', '');
    });
