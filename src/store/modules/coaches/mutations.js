export default{
    registerCoach(state, payload){
        //console.log(payload)
        state.coaches.push(payload);
    },
    setCoaches(state, payload){
        state.coaches = payload;
    }
};