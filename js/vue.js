Vue.component('a-button-link', {
  props: ['text', 'link', 'disabled', 'tooltip'],
  template: `
    <a v-if="link"
       class="btn btn-primary btn-sm"
       :class="{ 'disabled': disabled }"
       :href="link"
       v-html="text"
       data-toggle="tooltip"
       data-placement="top"
       :title="tooltip"></a>
  `
});

Vue.component('project-card', {
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
    </div>
  `
});

new Vue({
  el: '#projects',
  data: {
    projects: projects,
  },
});
