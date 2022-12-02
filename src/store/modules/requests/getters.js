export default{
    requests(state,getters, rootState, rootGetters){
        const coachId = rootGetters.userId;
        //console.log(state.requests)
        return state.requests.filter(req=>req.coachId==coachId);
    },
    hasRequests(state){
        return state.requests && state.requests.length>0
    }
};