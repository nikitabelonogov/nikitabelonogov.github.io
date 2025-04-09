const {createApp, defineComponent} = Vue

const Card = defineComponent({
  props: ['id', 'title', 'text', 'status', 'links', 'image', 'tags'],
  template: `
    <div :id="id" class="m-2 card perspective-card" style="width: 20rem;">
      <div v-if="image"
           class="card-img-top bg-flex-fill"
           :style="{ 'background-image': 'url(' + image + ')', height: '5rem' }">
      </div>
      <div class="card-body">
        <span v-if="tags" v-for="tag in tags" class="badge rounded-pill text-bg-primary" v-html="tag"></span>
        <h4 class="card-title" v-html="title"></h4>
        <p class="card-text" v-html="text"></p>
      </div>
      <div class="card-footer text-muted d-flex justify-content-between">
        <span class="my-auto text-truncate" v-html="status"></span>
        <div class="btn-group">
          <a-button-link v-if="links" v-for="link in links"
                         :key="link.link"
                         :link="link.link"
                         :text="link.text"
                         :disabled="link.disabled"
                         :tooltip="link.tooltip">
          </a-button-link>
        </div>
      </div>
    </div>`
});

const App = {
  components: {Card},
  template: `
    <card title="Hello" content="This is a card component."/>
  `
};

createApp(App).mount('#app')