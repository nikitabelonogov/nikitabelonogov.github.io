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
        $('#jenkinsprojects').css('background-image', "url(./images/telejenkins.svg)")
    },
    function () {
        $('#jenkinsprojects').css('background-image', 'none')
    }
);

$('#card-party-parrot-status').hover(
    function () {
        $('#jenkinsprojects').css('background-image', "url(./images/party-parrot-status.svg)")
    },
    function () {
        $('#jenkinsprojects').css('background-image', 'none')
    }
);

// Background change | Other Projects
$('#card-pidorbot').hover(
    function () {
        $('#otherprojects').css('background-image', "url(./images/pidorbot.svg)")
    },
    function () {
        $('#otherprojects').css('background-image', 'none')
    }
);

$('#split-with-bot').hover(
    function () {
        $('#otherprojects').css('background-image', "url(./images/split-with-bot.svg)")
    },
    function () {
        $('#otherprojects').css('background-image', 'none')
    }
);
