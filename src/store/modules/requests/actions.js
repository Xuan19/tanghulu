export default{
    contactCoach(context, payload){
        console.log(payload)
        const data = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            email: payload.email,
            message: payload.message
        }
        context.commit('sendRequest', data)
    }
    
};