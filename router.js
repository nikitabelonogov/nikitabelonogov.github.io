const routes = {
    '404': { template: '<p>Page not found</p>' },
    '': { template: '<p>Nothing here yet...</p>' },
    '#About': { template: '<div><p>Hi</p>My name is Nikita Belonogov.</div>' },
    '#Projects': { template: '<p>Nothing here yet...</p>' },
}

router = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.hash
    },
    computed: {
        template: function () {
            return routes[this.currentRoute] || routes['404']
        }
    },
    render(h) {
        return h(this.template)
    }
})

window.addEventListener('popstate', () => {
    router.currentRoute = window.location.hash
})