new Vue({
    el: '#unityprojects',
    data: {
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