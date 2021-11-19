import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'semantic-ui-css/semantic.min.css';
import VueSimpleAlert from "vue-simple-alert";
import VuetableFieldCheckbox from 'vuetable-2/src/components/VuetableFieldCheckbox.vue';

Vue.component('vuetable-field-checkbox', VuetableFieldCheckbox);


Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
