export default{
    async contactCoach(context, payload){
        const data = {
            email: payload.email,
            message: payload.message
        }

        const response = await fetch(`https://tanghulu-8d72e-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,{
            method: 'POST',
            body : JSON.stringify(data)
        })

        const responseData = await response.json();

        if(!response.ok){
              const error = new Error(responseData.message || 'fail to contact!');
            throw error;
        }

        context.commit('sendRequest', {
            ...data,
            coachId : payload.coachId,
            id: responseData.name
        })
    },

    async loadRequests(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        console.log(token)
        const response = await fetch(
            `https://tanghulu-8d72e-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token
            );

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'fail to fetch!');
            throw error;
        }

        const requests = [];

        for(const key in responseData){
            const request = {
                id:key,
                coachId:coachId,
                message: responseData[key].message,
                email: responseData[key].email,
            }

            requests.push(request)
        }

        context.commit('setRequests', requests)
    }
    
};