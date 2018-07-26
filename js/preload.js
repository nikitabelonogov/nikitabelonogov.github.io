function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        (new Image()).src = this;
    });
}

preload([
    './images/vega-power.png',
    './images/catch-me-if-you-can.png',
    './images/civilisationx.png',
    './images/telejenkins.svg',
    './images/party-parrot-status.svg',
    './images/pidorbot.svg',
]);
