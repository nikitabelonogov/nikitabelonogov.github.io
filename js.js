// ==========================================================================
// Shader background — drifting topographic contours on a fullscreen triangle.
// The pattern pans with page scroll so it reads as attached to the content.
// All parameters are baked into the GLSL as constants so the compiler can
// fold them; per frame only u_time, the scroll offset and u_theme are
// uploaded. u_theme crossfades the palette between dark (glowing contours
// on black) and light (ink contours on paper); the theme controller below
// drives it through setShaderTheme.
// Falls back to the CSS background painted on <body> when WebGL is missing.
// ==========================================================================

let setShaderTheme = () => {}; // no-op until the shader boots (or if WebGL is missing)

(function initBackground() {
  const canvas = document.getElementById('bg');
  const gl = canvas.getContext('webgl', {antialias: false, alpha: false, depth: false, stencil: false});
  if (!gl) return;

  const VERT = `
    attribute vec2 p;
    varying vec2 v_c;
    void main() {
      v_c = p * 0.5; // centered uv (uv - 0.5); exact — linear across the triangle
      gl_Position = vec4(p, 0.0, 1.0);
    }
  `;

  const FRAG = `
    precision highp float;
    varying vec2 v_c;
    uniform float u_time;  // pre-scaled by animation speed on the CPU
    uniform vec2 u_scale;  // (aspect, 1) * zoom — changes only on resize
    uniform float u_off;   // world-space pan from page scroll
    uniform float u_theme; // 0 = dark, 1 = light; eased on the CPU during a switch

    // ---- perlin-style gradient noise ----
    vec2 grad(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float pnoise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
      return mix(
        mix(dot(grad(i), f),
            dot(grad(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(grad(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(grad(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y);
    }

    // four noise octaves, each drifting its own way (velocity = direction * rate)
    float height(vec2 p) {
      return pnoise(p * 0.9 + vec2( 0.0765,  0.0644) * u_time) * 0.55
           + pnoise(p * 2.1 + vec2(-0.1554,  0.0383) * u_time) * 0.28
           + pnoise(p * 4.3 + vec2(-0.0799, -0.2474) * u_time) * 0.13
           + pnoise(p * 8.9 + vec2( 0.3719, -0.1951) * u_time) * 0.024;
    }

    // top-down topographic contours, like a paper map (20 levels, index every 5th)
    float scene(vec2 p) {
      float x = height(p + vec2(0.0, u_off)) * 20.0;
      float f = fract(x);
      float dist = min(f, 1.0 - f);          // distance to nearest contour level
      bool major = mod(floor(x + 0.5), 5.0) < 0.5;
      float w = major ? 0.0605 : 0.0275;     // height-band width: fat on flats, thin on slopes
      float line = 1.0 - smoothstep(w, w * 1.75, dist);
      return major ? line : line * 0.4;
    }

    void main() {
      vec2 q = v_c * u_scale;
      float g = scene(q);

      // chromatic aberration, strongest at the left/right sides;
      // k is exactly 0 in the center strip — coherent branch skips 2 of 3 taps
      float k = smoothstep(0.08, 0.55, abs(v_c.x)) * 0.01;
      vec3 col;
      if (k > 0.0) {
        col = vec3(scene(q * (1.0 - k)), g, scene(q * (1.0 + k)));
      } else {
        col = vec3(g);
      }

      float vig = dot(v_c, v_c);
      vec3 dark = col * (1.0 - vig); // glowing contours on black, vignetted
      // light: dark ink lines on warm paper — the CA channels become subtle
      // colored fringing on the ink; paper only takes a gentle edge shade
      vec3 light = mix(vec3(0.93, 0.91, 0.86), vec3(0.24, 0.25, 0.28), col);
      light *= 1.0 - vig * 0.3;
      gl_FragColor = vec4(mix(dark, light, u_theme), 1.0);
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

  // fullscreen triangle — no double-shaded diagonal seam
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'u_time');
  const uScale = gl.getUniformLocation(program, 'u_scale');
  const uOff = gl.getUniformLocation(program, 'u_off');
  const uTheme = gl.getUniformLocation(program, 'u_theme');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  let raf = null;
  let lastDraw = 0;
  let lastScroll = -1;
  let unitsPerPx = 0; // world units per CSS pixel — pattern pans 1:1 with content

  // theme tween — initial value comes from data-theme set before first paint
  const THEME_FADE_MS = 900;
  let themeCur = document.documentElement.dataset.theme === 'light' ? 1 : 0;
  let themeTgt = themeCur;
  let themeFrom = themeCur;
  let themeStart = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uScale, (canvas.width / canvas.height) * 3.0, 3.0);
    unitsPerPx = 3.0 / innerHeight;
  }

  function frame(now) {
    if (themeCur !== themeTgt) {
      const k = Math.min((now - themeStart) / THEME_FADE_MS, 1);
      themeCur = k === 1 ? themeTgt : themeFrom + (themeTgt - themeFrom) * k * k * (3 - 2 * k);
    }
    gl.uniform1f(uTheme, themeCur);
    // freeze drift for reduced motion — scroll pan still tracks user input
    gl.uniform1f(uTime, reduceMotion.matches ? 0 : (now - start) * 0.00025); // seconds * speed 0.25
    gl.uniform1f(uOff, -window.scrollY * unitsPerPx);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    const scroll = window.scrollY;
    if (now - lastDraw < 30 && scroll === lastScroll) return; // idle drift needs only ~30fps; scroll redraws every tick
    lastDraw = now;
    lastScroll = scroll;
    frame(now);
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
    frame(performance.now());
  });
  addEventListener('scroll', () => {
    if (raf === null) frame(performance.now()); // loop paused (reduced motion) — still pan with scroll
  }, {passive: true});
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
  reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : play()));

  setShaderTheme = (light, animate) => {
    themeTgt = light ? 1 : 0;
    if (!animate || reduceMotion.matches) {
      themeCur = themeTgt; // reduced motion: snap, no crossfade
    } else {
      themeFrom = themeCur;
      themeStart = performance.now();
    }
    if (raf === null) frame(performance.now()); // repaint even while the loop is paused
  };

  resize();
  frame(performance.now()); // static frame even with reduced motion
  play();
})();

// ==========================================================================
// Theme — corner button cycles system → light → dark, persisted in
// localStorage. Applies data-theme for CSS, retints the browser chrome via
// <meta theme-color>, and crossfades the shader palette. A temporary
// .theme-fade class on <html> makes the CSS colors ease in step with it.
// ==========================================================================

(function initTheme() {
  const ORDER = ['system', 'light', 'dark'];
  const ICONS = {
    system: 'fa-solid fa-circle-half-stroke',
    light: 'fa-solid fa-sun',
    dark: 'fa-solid fa-moon',
  };
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('i');
  const metaColor = document.querySelector('meta[name="theme-color"]');
  const sysDark = matchMedia('(prefers-color-scheme: dark)');
  let fadeTimer = 0;

  let setting = localStorage.getItem('theme');
  if (!ORDER.includes(setting)) setting = 'system';

  function apply(animate) {
    const theme = setting === 'system' ? (sysDark.matches ? 'dark' : 'light') : setting;
    const root = document.documentElement;
    if (animate) {
      root.classList.add('theme-fade');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => root.classList.remove('theme-fade'), 1000);
    }
    root.dataset.theme = theme;
    metaColor.content = theme === 'dark' ? '#000000' : '#ece8dc';
    icon.className = ICONS[setting];
    btn.setAttribute('aria-label', `Theme: ${setting}. Switch to ${ORDER[(ORDER.indexOf(setting) + 1) % ORDER.length]}`);
    btn.title = `Theme: ${setting}`;
    setShaderTheme(theme === 'light', animate);
  }

  btn.addEventListener('click', () => {
    setting = ORDER[(ORDER.indexOf(setting) + 1) % ORDER.length];
    try {
      localStorage.setItem('theme', setting);
    } catch (e) { /* private mode — theme still applies for this visit */ }
    apply(true);
  });

  // OS theme flips fade too when following the system
  sysDark.addEventListener('change', () => {
    if (setting === 'system') apply(true);
  });

  apply(false);
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
    text: 'Theme: "You Are The Weapon".',
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
