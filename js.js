// ==========================================================================
// Shader background — animated aurora on a fullscreen WebGL quad.
// Falls back to the CSS gradient painted on <body> when WebGL is missing.
// ==========================================================================

(function initBackground() {
  const canvas = document.getElementById('bg');
  const gl = canvas.getContext('webgl', {antialias: false, alpha: false});
  if (!gl) return;

  const VERT = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec2(7.3, 3.1);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 1.6;
      float t = u_time * 0.04;

      float n1 = fbm(p + vec2(t * 0.8, -t * 0.6));
      float n2 = fbm(p * 1.7 + vec2(-t * 0.5, t * 0.7) + n1 * 1.5);

      vec3 base   = vec3(0.043, 0.051, 0.086);
      vec3 purple = vec3(0.26, 0.16, 0.55);
      vec3 teal   = vec3(0.05, 0.35, 0.45);
      vec3 pink   = vec3(0.75, 0.25, 0.45);

      vec3 col = base;
      col = mix(col, purple, smoothstep(0.35, 0.85, n1) * 0.8);
      col = mix(col, teal, smoothstep(0.4, 0.9, n2) * 0.7);
      col += pink * pow(smoothstep(0.55, 1.0, n1 * n2 * 2.0), 2.0) * 0.25;

      col *= 1.0 - distance(uv, vec2(0.5, 0.42)) * 0.55;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  let raf = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function frame() {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function loop() {
    frame();
    raf = requestAnimationFrame(loop);
  }

  function play() {
    if (raf === null && !reduceMotion.matches && !document.hidden) {
      raf = requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  addEventListener('resize', () => {
    resize();
    frame();
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
  reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : play()));

  resize();
  frame(); // static frame even with reduced motion
  play();
})();

// ==========================================================================
// Projects
// ==========================================================================

const projects = [
  {
    id: 'gambling-n-dungeons',
    title: 'Gambling & Dungeons',
    text: 'Theme: "Spin to Win".',
    status: 'published',
    image: './images/gambling-n-dungeons.webp',
    pixelated: true,
    tags: ['unity', 'game', 'game jam'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'https://nikitabelonogov.itch.io/gambling-n-dungeons', icon: 'fa-brands fa-itch-io', label: 'itch.io'},
    ],
  },
  {
    id: 'blackbook',
    title: 'Black Book',
    text: 'Graffiti sketches',
    status: 'ongoing',
    image: './images/black-book.webp',
    tags: ['graffiti'],
    links: [
      {href: 'https://www.instagram.com/wokseone/', icon: 'fa-brands fa-instagram', label: 'Instagram'},
    ],
  },
  {
    id: 'uaretheweapon',
    title: 'U are the weapon',
    text: 'Game-jam entry. Theme: "You Are The Weapon".',
    status: 'published',
    image: './images/u-are-the-weapon.webp',
    pixelated: true,
    tags: ['unity', 'game', 'game jam'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'https://nikitabelonogov.itch.io/u-are-the-weapon', icon: 'fa-brands fa-itch-io', label: 'itch.io'},
    ],
  },
  {
    id: 'space-shift',
    title: 'Space Shift',
    text: 'Adventure game that will make you question the fundamental reality of space itself.',
    status: 'published',
    image: './images/space-shift.webp',
    pixelated: true,
    tags: ['unity', 'game', 'game jam'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'https://nikitabelonogov.itch.io/spaceshift', icon: 'fa-brands fa-itch-io', label: 'itch.io'},
    ],
  },
  {
    id: 'telejenkins',
    title: 'TeleJenkins',
    text: 'This plugin allows Jenkins to send notifications via telegram bot.',
    status: 'published',
    image: './images/telejenkins.svg',
    tags: ['jenkins', 'plugin'],
    links: [
      {href: 'https://github.com/jenkinsci/telegram-notifications-plugin', icon: 'fa-brands fa-github', label: 'GitHub'},
      {href: 'https://plugins.jenkins.io/telegram-notifications', icon: 'fa-brands fa-jenkins', label: 'Jenkins plugin page'},
    ],
  },
  {
    id: 'party-parrot-status',
    title: 'Party Parrot Status',
    text: 'Providing a party parrot look to Jenkins Status indicators.',
    status: 'published',
    image: './images/party-parrot-status.svg',
    tags: ['jenkins', 'plugin'],
    links: [
      {href: 'https://github.com/jenkinsci/partyparrotstatus-plugin', icon: 'fa-brands fa-github', label: 'GitHub'},
      {href: 'https://plugins.jenkins.io/partyparrotstatus', icon: 'fa-brands fa-jenkins', label: 'Jenkins plugin page'},
    ],
  },
  {
    id: 'pidorbot',
    title: 'PidorBot',
    text: 'Just a nasty person @NAUGHTYPIDORBOT',
    status: 'published',
    image: './images/pidorbot.svg',
    tags: ['telegram', 'bot'],
    links: [
      {href: 'https://github.com/co-code/pidor-bot', icon: 'fa-brands fa-github', label: 'GitHub'},
      {href: 'http://t.me/NAUGHTYPIDORBOT', icon: 'fa-brands fa-telegram', label: 'Telegram'},
    ],
  },
  {
    id: 'split-with-bot',
    title: 'Split with Bot',
    text: 'Collaborative book of debtors @split_with_bot',
    status: 'published',
    image: './images/split-with-bot.svg',
    tags: ['telegram', 'bot'],
    links: [
      {href: 'https://github.com/nikitabelonogov/split-with-bot', icon: 'fa-brands fa-github', label: 'GitHub'},
      {href: 'http://t.me/split_with_bot', icon: 'fa-brands fa-telegram', label: 'Telegram'},
    ],
  },
  {
    id: 'vega-power',
    title: 'Vega Power',
    text: '2D Platformer',
    status: 'archived',
    image: './images/vega-power.webp',
    tags: ['unity', 'game'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'http://vegapower.s3-website-us-east-1.amazonaws.com', text: 'Play', label: 'Play in browser'},
    ],
  },
  {
    id: 'catch-me-if-you-can',
    title: 'Catch me if you can',
    text: 'Catch all planes',
    status: 'archived',
    image: './images/catch-me-if-you-can.webp',
    tags: ['unity', 'game'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'http://catchmeifyoucan.s3-website-us-east-1.amazonaws.com', text: 'Play', label: 'Play in browser'},
    ],
  },
  {
    id: 'civilisationx',
    title: 'CivilisationX',
    text: 'Civilisation like game',
    status: 'archived',
    image: './images/civilisationx.webp',
    tags: ['unity', 'game'],
    links: [
      {icon: 'fa-brands fa-github', label: 'GitHub', disabled: true, tooltip: 'Private GitHub repository'},
      {href: 'http://civilisationx.s3-website-us-east-1.amazonaws.com', text: 'Play', label: 'Play in browser'},
    ],
  },
];

// ==========================================================================
// Vue app — glass cards with cursor tilt
// ==========================================================================

const {createApp, defineComponent} = Vue;

const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const STATUS_LABELS = {
  ongoing: 'Ongoing',
  published: 'Published',
  archived: 'Archived',
};

const Card = defineComponent({
  props: ['id', 'title', 'text', 'status', 'links', 'image', 'tags', 'pixelated'],
  computed: {
    statusLabel() {
      return STATUS_LABELS[this.status] || this.status;
    },
  },
  methods: {
    onMove(e) {
      if (!finePointer.matches || prefersReducedMotion.matches) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`);
    },
    onLeave(e) {
      const el = e.currentTarget;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    },
  },
  template: `
    <article :id="id" class="card" @pointermove="onMove" @pointerleave="onLeave">
      <img v-if="image"
           class="card-img"
           :class="{pixelated}"
           :src="image"
           :alt="title + ' cover'"
           loading="lazy">
      <div class="card-body">
        <div v-if="tags && tags.length" class="tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-text">{{ text }}</p>
      </div>
      <div class="card-footer">
        <span class="status">
          <span class="status-dot" :class="'status-' + status"></span>{{ statusLabel }}
        </span>
        <div class="card-links">
          <template v-for="link in links" :key="link.href || link.label">
            <span v-if="link.disabled"
                  class="icon-btn is-disabled"
                  :title="link.tooltip || 'Unavailable'">
              <i :class="link.icon"></i>
            </span>
            <a v-else
               class="icon-btn"
               :class="{'pill-btn': link.text}"
               :href="link.href"
               :aria-label="link.label"
               target="_blank"
               rel="noopener">
              <i v-if="link.icon" :class="link.icon"></i><template v-if="link.text">{{ link.text }}</template>
            </a>
          </template>
        </div>
      </div>
    </article>
  `,
});

const App = {
  components: {Card},
  data() {
    return {projects};
  },
  computed: {
    active() {
      return this.projects.filter((p) => p.status !== 'archived');
    },
    archived() {
      return this.projects.filter((p) => p.status === 'archived');
    },
  },
  template: `
    <section class="section" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div class="grid">
        <Card v-for="project in active" :key="project.id" v-bind="project"/>
      </div>
    </section>
    <section class="section archive" aria-labelledby="archive-heading">
      <h2 id="archive-heading">Archive</h2>
      <p class="section-note">Old prototypes and game-jam leftovers, kept for history.</p>
      <div class="grid">
        <Card v-for="project in archived" :key="project.id" v-bind="project"/>
      </div>
    </section>
  `,
};

createApp(App).mount('#app');
