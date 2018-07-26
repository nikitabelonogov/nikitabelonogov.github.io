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