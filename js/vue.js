Vue.component('a-button-link', {
  props: ['text', 'link', 'disabled', 'tooltip'],
  template: '' +
    '<a v-if="link"' +
    '   class="btn btn-primary btn-sm"' +
    '   :class="{ \'disabled\': disabled }"' +
    '   :href="link"' +
    '   v-html="text"' +
    '   data-toggle="tooltip"' +
    '   data-placement="top"' +
    '   :title="tooltip"></a>\n'
});

Vue.component('project-card', {
  props: ['id', 'title', 'text', 'status', 'links', 'image'],
  template: '' +
    '<div :id="id" class="m-2 card perspective-card" style="width: 20rem;">\n' +
    '    <div v-if="image"' +
    '         class="card-img-top bg-flex-fill" ' +
    '         :style="{ \'background-image\': \'url(\' + image + \')\', height: \'5rem\' }"></div>\n' +
    '    <div class="card-body">\n' +
    '        <h4 class="card-title" v-html="title"></h4>\n' +
    '        <p class="card-text" v-html="text"></p>\n' +
    '    </div>\n' +
    '    <div class="card-footer text-muted d-flex justify-content-between">\n' +
    '        <span class="my-auto text-truncate" v-html="status"></span>\n' +
    '        <div class="btn-group">\n' +
    '            <a-button-link v-if="links" v-for="link in links"\n' +
    '                           :key="link.link"\n' +
    '                           :link="link.link"\n' +
    '                           :text="link.text"\n' +
    '                           :disabled="link.disabled"\n' +
    '                           :tooltip="link.tooltip">\n' +
    '            </a-button-link>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n'
});

new Vue({
  el: '#projects',
  data: {
    projects : projects,
  },
});
