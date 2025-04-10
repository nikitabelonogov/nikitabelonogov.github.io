const {createApp, defineComponent} = Vue

projects = [
  {
    id: 'blackbook',
    title: 'Black Book',
    text: 'Graffiti sketches',
    status: 'Ongoing',
    image_url: './images/black-book.jpg',
    tags: [],
    links: [
      {
        link: 'https://www.instagram.com/wokseone/',
        text: '<i class="fa-brands fa-instagram"></i>',
      },
    ]
  },

  {
    id: 'uaretheweapon',
    title: 'U are the weapon',
    text: 'Theme: "You Are The Weapon"',
    status: 'Published',
    image_url: './images/u-are-the-weapon.png',
    tags: ['unity', 'game', 'game jam'],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/YouAreTheWeapon',
        text: '<i class="fa-brands fa-github"></i>',
        tooltip: 'Private GitHub repository',
        disabled: true,
      },
      {
        link: 'https://nikitabelonogov.itch.io/u-are-the-weapon',
        text: '<i class="fa-brands fa-itch-io"></i>',
      },
    ]
  },

  {
    id: 'space-shift',
    title: 'Space Shift',
    text: 'Adventure game that will make you question the fundamental reality of space itself.',
    status: 'Published',
    image_url: './images/space-shift.png',
    tags: ['unity', 'game', 'game jam'],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/ShipShift',
        text: '<i class="fa-brands fa-github"></i>',
        tooltip: 'Private GitHub repository',
        disabled: true,
      },
      {
        link: 'https://nikitabelonogov.itch.io/spaceshift',
        text: '<i class="fa-brands fa-itch-io"></i>',
      },
    ]
  },

  {
    id: 'vega-power',
    title: 'Vega Power',
    text: '2D Platformer',
    status: 'Abandoned',
    image_url: './images/vega-power.png',
    tags: ['unity', 'game',],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/VegaPower',
        text: '<i class="fa-brands fa-github"></i>',
        disabled: true,
      },
      {
        link: 'http://vegapower.s3-website-us-east-1.amazonaws.com',
        text: 'Try out',
      },
    ]
  },

  {
    id: 'catch-me-if-you-can',
    title: 'Catch me if you can',
    text: 'Catch all planes',
    status: 'Abandoned',
    image_url: './images/catch-me-if-you-can.png',
    tags: ['unity', 'game',],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/CatchMeIfYouCan',
        text: '<i class="fa-brands fa-github"></i>',
        disabled: true,
      },
      {
        link: 'http://catchmeifyoucan.s3-website-us-east-1.amazonaws.com',
        text: 'Try out',
      },
    ]
  },

  {
    id: 'civilisationx',
    title: 'CivilisationX',
    text: 'Civilisation like game',
    status: 'Abandoned',
    image_url: './images/civilisationx.png',
    tags: ['unity', 'game',],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/civilizationX',
        text: '<i class="fa-brands fa-github"></i>',
        disabled: true,
      },
      {
        link: 'http://civilisationx.s3-website-us-east-1.amazonaws.com',
        text: 'Try out',
      },
    ]
  },

  {
    id: 'telejenkins',
    title: 'TeleJenkins',
    text: 'This plugin allows Jenkins to send notifications via telegram bot.',
    status: 'Published',
    image_url: './images/telejenkins.svg',
    tags: ['jenkins', 'plugin',],
    links: [
      {
        link: 'https://github.com/jenkinsci/telegram-notifications-plugin',
        text: '<i class="fab fa-github"></i>',
      },
      {
        link: 'https://plugins.jenkins.io/telegram-notifications',
        text: '<i class="fa-brands fa-jenkins"></i>',
      },
    ]
  },

  {
    id: 'party-parrot-status',
    title: 'Party Parrot Status',
    text: 'Providing a party parrot look to Jenkins Status indicators.',
    status: 'Published',
    image_url: './images/party-parrot-status.svg',
    tags: ['jenkins', 'plugin',],
    links: [
      {
        link: 'https://github.com/jenkinsci/partyparrotstatus-plugin',
        text: '<i class="fa-brands fa-github"></i>',
      },
      {
        link: 'https://plugins.jenkins.io/partyparrotstatus',
        text: '<i class="fa-brands fa-jenkins"></i>',
      },
    ]
  },

  {
    id: 'pidorbot',
    title: 'PidorBot',
    text: 'Just a nasty person @NAUGHTYPIDORBOT',
    status: 'Published',
    image_url: './images/pidorbot.svg',
    tags: ['telegram', 'bot'],
    links: [
      {
        link: 'https://github.com/co-code/pidor-bot',
        text: '<i class="fa-brands fa-github"></i>',
      },
      {
        link: 'http://t.me/NAUGHTYPIDORBOT',
        text: '<i class="fab fa-telegram"></i>',
      },
    ]
  },

  {
    id: 'split-with-bot',
    title: 'Split with Bot',
    text: 'Collaborative book of debtors @split_with_bot',
    status: 'Published',
    image_url: './images/split-with-bot.svg',
    tags: ['telegram', 'bot'],
    links: [
      {
        link: 'https://github.com/nikitabelonogov/split-with-bot',
        text: '<i class="fa-brands fa-github"></i>',
      },
      {
        link: 'http://t.me/split_with_bot',
        text: '<i class="fab fa-telegram"></i>',
      },
    ]
  },

  {
    id: 'jewel',
    title: 'Jewel',
    text: 'Advert dashboard',
    status: 'Abandoned',
    links: [
      {
        link: 'https://github.com/ooow/jewel-f',
        text: '<i class="fa-brands fa-github"></i>',
        tooltip: 'Private GitHub repository',
        disabled: true,
      },
      {
        link: 'https://github.com/ooow/jewel-b',
        text: '<i class="fa-brands fa-github"></i>',
        tooltip: 'Private GitHub repository',
        disabled: true,
      },
    ]
  },
];

const LinkButton = defineComponent({
  props: ['text', 'link', 'disabled'],
  template: `
    <a v-if="link"
       class="btn btn-primary btn-sm"
       :class="{ 'disabled': disabled }"
       :href="link"
       v-html="text"
    />
  `
});

const Card = defineComponent({
  props: ['id', 'title', 'text', 'status', 'links', 'image', 'tags'],
  components: {LinkButton},
  data() {
    return {
      rotationX: 0.5,
      rotationY: 0.5,
      highlight_offset: 50,
    }
  },
  methods: {
    handleMouseMove(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.rotationX = x / rect.width;
      this.rotationY = y / rect.height;
    }
  },
  template: `
    <div :id="id"
         class="m-2 card"
         style="width: 20rem;"
         @mouseleave="rotationY = 0.5; rotationX = 0.5"
         @mousemove="handleMouseMove"
         :style="{ transform: 'perspective(600px) rotateX(' + (-20 + rotationY * 40 ) + 'deg) rotateY(' + (20 - rotationX * 40) + 'deg)'}">
      <div class="card-overlay"
           :style="{ background: 'linear-gradient(45deg, transparent '+ (20 + rotationX * highlight_offset) +'%, rgba(255,255,255,0.4) '+ (20 + rotationX * highlight_offset) +'%, rgba(255,255,255,0.4) '+ (30 + rotationX * highlight_offset) +'%, transparent '+ (30 + rotationX * highlight_offset) +'%, transparent '+ (40 + rotationX * highlight_offset) +'%, rgba(255,255,255,0.4) '+ (40 + rotationX * highlight_offset) +'%, rgba(255,255,255,0.4) '+ (60 + rotationX * highlight_offset) +'%, transparent '+ (60 + rotationX * highlight_offset) +'%, transparent)' }"></div>
      <div v-if="image"
           class="card-img-top bg-flex-fill"
           :style="{ 'background-image': 'url(' + image + ')', height: '8rem' }">
      </div>
      <div class="card-body" style="transform: translateZ(1000rem)">
        <span v-if="tags" v-for="tag in tags" class="badge rounded-pill text-bg-primary" v-html="tag"></span>
        <h4 class="card-title" v-html="title"></h4>
        <p class="card-text" v-html="text"></p>
      </div>
      <div class="card-footer text-muted d-flex justify-content-between">
        <span class="my-auto text-truncate" v-html="status"></span>
        <div class="btn-group">
          <LinkButton v-if="links" v-for="link in links"
                      :key="link.link"
                      :link="link.link"
                      :text="link.text"
                      :disabled="link.disabled"
          />
        </div>
      </div>
    </div>`
});

const App = {
  data() {
    return {
      projects: projects,
    }
  },
  components: {Card},
  template: `
    <div class="container">
      <div class="m-auto d-flex flex-wrap justify-content-center">
        <Card v-for="project in projects"
              :key="project.id"
              :id="project.id"
              :title="project.title"
              :text="project.text"
              :status="project.status"
              :links="project.links"
              :image="project.image_url"
              :tags="project.tags"/>
      </div>
    </div>
  `
};

  createApp(App).mount('#app')