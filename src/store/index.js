import { createStore } from 'vuex';
import coachesModules from './modules/coaches';
import requestsModules from './modules/requests';
import authModules from './modules/auth/index.js';

const store = createStore({
    modules:{
        coaches: coachesModules,
        requests: requestsModules,
        auth: authModules
    }
});
export default store;