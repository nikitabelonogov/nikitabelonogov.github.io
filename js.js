// Image preload
function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        (new Image()).src = this;
    });
}

preload([
    './images/vega-power.png',
    './images/catch-me-if-you-can.png',
    './images/civilisationx.png',
    './images/telejenkins.jpeg',
    './images/party-parrot-status.gif'
]);

// Changing logo
const logos = ['meow meow meow', 'pew pew pew'];
$('#navbar-brand').html(logos[Math.floor((Math.random() * logos.length))]);

// Roll a dice
const dices = [
    'fas fa-dice-one',
    'fas fa-dice-two',
    'fas fa-dice-three',
    'fas fa-dice-four',
    'fas fa-dice-five',
    'fas fa-dice-six'
];
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

// Scroll control
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

// Background change | Unity Projects
$('#card-vega-power').hover(
    function () {
        $('#unityprojects').css('background-image', "url(./images/vega-power.png)")
    },
    function () {
        $('#unityprojects').css('background-image', 'none')
    }
);
$('#card-catch-me-if-you-can').hover(
    function () {
        $('#unityprojects').css('background-image', "url(./images/catch-me-if-you-can.png)")
    },
    function () {
        $('#unityprojects').css('background-image', 'none')
    }
);
$('#card-civilisationx').hover(
    function () {
        $('#unityprojects').css('background-image', "url(./images/civilisationx.png)")
    },
    function () {
        $('#unityprojects').css('background-image', 'none')
    }
);

// Background change | Jenkins Projects
$('#card-telejenkins').hover(
    function () {
        $('#jenkinsprojects').css('background-image', "url(./images/telejenkins.jpeg)")
    },
    function () {
        $('#jenkinsprojects').css('background-image', 'none')
    }
);

$('#card-party-parrot-status').hover(
    function () {
        $('#jenkinsprojects').css('background-image', "url(./images/party-parrot-status.gif)")
    },
    function () {
        $('#jenkinsprojects').css('background-image', 'none')
    }
);