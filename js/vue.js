Vue.component('project-card', {
    props: ['id', 'title', 'text', 'status', 'github_link', 'telegram_link', 'jenkins_link', 'demo_link'],
    template: '' +
    '<div :id="id" class="m-1 card" style="width: 20rem;">\n' +
    '    <div class="card-body">\n' +
    '        <h4 class="card-title">{{ title }}</h4>\n' +
    '        <p class="card-text">{{ text }}</p>\n' +
    '    </div>\n' +
    '    <div class="card-footer text-muted d-flex justify-content-between">\n' +
    '        <span class="my-auto text-truncate">{{ status }}</span>\n' +
    '        <div class="btn-group">\n' +
    '            <a v-if="github_link" class="btn btn-primary btn-sm"\n' +
    '               :href="github_link"><i class="fab fa-github"></i></a>\n' +
    '            <a v-if="telegram_link" class="btn btn-primary btn-sm"\n' +
    '               :href="telegram_link"><i class="fab fa-telegram"></i></a>\n' +
    '            <a v-if="jenkins_link" class="btn btn-primary btn-sm"\n' +
    '               :href="jenkins_link"><i class="fab fa-jenkins"></i></a>\n' +
    '            <a v-if="demo_link" class="btn btn-primary btn-sm"\n' +
    '               :href="demo_link">Try out</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n'
})

new Vue({
    el: '#unityprojects',
    data: {
        text: 'Some Unity projects I\'m currently working on',
        projects: [
            {
                id: 'card-vega-power',
                title: 'Vega Power',
                text: '2D Platformer',
                status: 'In Development',
                // github_link: 'https://github.com/nikitabelonogov/VegaPower',
                demo_link: 'http://vegapower.s3-website-us-east-1.amazonaws.com',
                image_url: './images/vega-power.png',
            },
            {
                id: 'card-catch-me-if-you-can',
                title: 'Catch me if you can',
                text: 'Catch all planes',
                status: 'In Development',
                // github_link: 'https://github.com/nikitabelonogov/VegaPower',
                demo_link: 'http://civilisationx.s3-website-us-east-1.amazonaws.com',
                image_url: './images/catch-me-if-you-can.png',
            },
            {
                id: 'card-civilisationx',
                title: 'CivilisationX',
                text: 'Civilisation like game',
                status: 'In Development',
                // github_link: 'https://github.com/nikitabelonogov/civilizationX',
                demo_link: 'http://civilisationx.s3-website-us-east-1.amazonaws.com',
                image_url: './images/civilisationx.png',
            },
        ]
    }
})

new Vue({
    el: '#jenkinsprojects',
    data: {
        text: 'Some of my participations to JenkinsCI',
        projects: [
            {
                id: 'card-telejenkins',
                title: 'TeleJenkins',
                text: 'This plugin allows Jenkins to send notifications via telegram bot.',
                status: 'Released',
                github_link: 'https://github.com/jenkinsci/telegram-notifications-plugin',
                jenkins_link: 'https://plugins.jenkins.io/telegram-notifications',
                image_url: './images/telejenkins.jpeg',
            },
            {
                id: 'card-party-parrot-status',
                title: 'Party Parrot Status',
                text: 'Providing a party parrot look to Jenkins Status indicators.',
                status: 'Released',
                github_link: 'https://github.com/jenkinsci/partyparrotstatus-plugin',
                jenkins_link: 'https://plugins.jenkins.io/partyparrotstatus',
                image_url: './images/party-parrot-status.gif',
            },
        ]
    }
})

new Vue({
    el: '#otherprojects',
    data: {
        text: 'And more...',
        projects: [
            {
                id: 'card-pidorbot',
                title: 'PidorBot👹',
                text: 'Just a nasty person @NAUGHTYPIDORBOT',
                status: 'Released',
                github_link: 'https://github.com/co-code/pidor-bot',
                telegram_link: 'http://t.me/NAUGHTYPIDORBOT',
                image_url: './images/pidorbot.svg',
            },
        ]
    }
})