Vue.component('a-button-link', {
    props: ['text', 'link', 'disabled'],
    template: '' +
    '<a v-if="link"\n' +
    '   class="btn btn-primary btn-sm"\n' +
    '   v-bind:class="{ \'disabled\': disabled }"\n' +
    '   :href="link"\n' +
    '   v-html="text"></a>\n'
})

Vue.component('project-card', {
    props: ['id', 'title', 'text', 'status', 'links'],
    template: '' +
    '<div :id="id" class="m-1 card" style="width: 20rem;">\n' +
    '    <div class="card-body">\n' +
    '        <h4 v-html="title" class="card-title"></h4>\n' +
    '        <p v-html="text" class="card-text"></p>\n' +
    '    </div>\n' +
    '    <div class="card-footer text-muted d-flex justify-content-between">\n' +
    '        <span class="my-auto text-truncate">{{ status }}</span>\n' +
    '        <div class="btn-group">\n' +
    '            <a-button-link v-if="links" v-for="link in links"\n' +
    '                           :key="link.link"\n' +
    '                           :link="link.link"\n' +
    '                           :text="link.text"\n' +
    '                           :disabled="link.disabled">\n' +
    '            </a-button-link>\n' +
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
                image_url: './images/vega-power.png',
                links: [
                    {
                        link: 'https://github.com/nikitabelonogov/VegaPower',
                        text: '<i class="fab fa-github"></i>',
                        disabled: true,
                    },
                    {
                        link: 'http://vegapower.s3-website-us-east-1.amazonaws.com',
                        text: 'Try out',
                    },
                ]
            },
            {
                id: 'card-catch-me-if-you-can',
                title: 'Catch me if you can',
                text: 'Catch all planes',
                status: 'In Development',
                image_url: './images/catch-me-if-you-can.png',
                links: [
                    {
                        link: 'https://github.com/nikitabelonogov/CatchMeIfYouCan',
                        text: '<i class="fab fa-github"></i>',
                        disabled: true,
                    },
                    {
                        link: 'http://catchmeifyoucan.s3-website-us-east-1.amazonaws.com',
                        text: 'Try out',
                    },
                ]
            },
            {
                id: 'card-civilisationx',
                title: 'CivilisationX',
                text: 'Civilisation like game',
                status: 'In Development',
                image_url: './images/civilisationx.png',
                links: [
                    {
                        link: 'https://github.com/nikitabelonogov/civilizationX',
                        text: '<i class="fab fa-github"></i>',
                        disabled: true,
                    },
                    {
                        link: 'http://civilisationx.s3-website-us-east-1.amazonaws.com',
                        text: 'Try out',
                    },
                ]
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
                image_url: './images/telejenkins.jpeg',
                links: [
                    {
                        link: 'https://github.com/jenkinsci/telegram-notifications-plugin',
                        text: '<i class="fab fa-github"></i>',
                    },
                    {
                        link: 'https://plugins.jenkins.io/telegram-notifications',
                        text: '<i class="fab fa-jenkins"></i>',
                    },
                ]
            },
            {
                id: 'card-party-parrot-status',
                title: 'Party Parrot Status',
                text: 'Providing a party parrot look to Jenkins Status indicators.',
                status: 'Released',
                image_url: './images/party-parrot-status.gif',
                links: [
                    {
                        link: 'https://github.com/jenkinsci/partyparrotstatus-plugin',
                        text: '<i class="fab fa-github"></i>',
                    },
                    {
                        link: 'https://plugins.jenkins.io/partyparrotstatus',
                        text: '<i class="fab fa-jenkins"></i>',
                    },
                ]

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
                image_url: './images/pidorbot.svg',
                links: [
                    {
                        link: 'https://github.com/co-code/pidor-bot',
                        text: '<i class="fab fa-github"></i>',
                    },
                    {
                        link: 'http://t.me/NAUGHTYPIDORBOT',
                        text: '<i class="fab fa-telegram"></i>',
                    },
                ]

            },
        ]
    }
})