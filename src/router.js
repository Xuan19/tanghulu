import{createRouter, createWebHistory} from 'vue-router';
import Coach from './pages/coaches/Coach.vue';
import Coaches from './pages/coaches/Coaches.vue';
import CoachResgistation from './pages/coaches/CoachRegistation.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';


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
        {path: '/register', component: CoachResgistation},
        {path: '/requests', component: RequestsReceived},
        {path: '/:notFound(.*)', component: NotFound},
    ]
})

export default router;