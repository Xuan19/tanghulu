export default{
    sendRequest(state, payload){
        //console.log(payload)
        state.requests.push(payload)
    },
    setRequests(state, payload){
        //console.log(payload)
        state.requests= payload
    }
};