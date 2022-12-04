import{createRouter, createWebHistory} from 'vue-router';
import Coach from './pages/coaches/Coach.vue';
import Coaches from './pages/coaches/Coaches.vue';
import CoachResgistation from './pages/coaches/CoachRegistation.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: Coaches},
        {
            path: '/coaches/:id', 
            component: Coach, 
            props:true,
            children:[
                {path:'contact', component:ContactCoach},
            ]
        },
        {path: '/register', component: CoachResgistation, meta:{requiresAuth: true}},
        {path: '/requests', component: RequestsReceived, meta:{requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta:{requiresUnAuth: true}},
        {path: '/:notFound(.*)', component: NotFound},
    ]
});

router.beforeEach(function(to,from,next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated){
        next('/coaches')
    } else {
        next();
    }
})



export default router;