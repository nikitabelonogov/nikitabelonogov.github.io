const dices = [
    'fas fa-dice-one',
    'fas fa-dice-two',
    'fas fa-dice-three',
    'fas fa-dice-four',
    'fas fa-dice-five',
    'fas fa-dice-six'
];

// on mouse hover change cursor to pointer
$("#dice").hover(function () {
    $(this).css('cursor', 'pointer');
});

$("#dice").on('click', function (event) {
    let time = 1000;
    let angle = -1080;
    let dice = this;
    if ($(dice).data('executing')) return;
    $(dice).data('executing', true);
    setTimeout(function () {
        $(dice).data('executing', false);
    }, time);
    $(dice).animate(
        {borderSpacing: angle},
        {
            step: function (now, fx) {
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: time
        }, 'swing');
    setTimeout(function () {
        $(dice).attr('class', 'fas fa-square');
    }, time / 3);
    setTimeout(function () {
        $(dice).attr('class', dices[Math.floor((Math.random() * dices.length))]);
    }, time * 2 / 3);
});
