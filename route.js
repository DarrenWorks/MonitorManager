import Vue from 'vue';
import VueRouter from 'vue-router';

// 注册Vue Router插件
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
    ]
});
