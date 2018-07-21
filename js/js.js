// Changing logo
const logos = ['meow meow meow', 'pew pew pew'];
$('#navbar-brand').html(logos[Math.floor((Math.random() * logos.length))]);

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