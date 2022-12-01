export default{
    sendRequest(state, payload){
        state.requests.push(payload)
    }
};