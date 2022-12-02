export default{
    async registerCoach(context,data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate:data.hourlyRate,
            areas: data.areas,
        }
        
        const response = await fetch(`https://tanghulu-8d72e-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,{
            method: 'PUT',
            body : JSON.stringify(coachData)
        })

        if(!response.ok){
            console.log('error')
        }

        context.commit('registerCoach', {
            ...coachData,
            id : userId
        })
    },
    async loadCoaches(context){
        const response = await fetch(
            `https://tanghulu-8d72e-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
            );
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'fail to fetch!');
            throw error;
        }

        const coaches = [];

        for(const key in responseData){
            const coach = {
                id:key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate:responseData[key].hourlyRate,
                areas: responseData[key].areas,
            }

            coaches.push(coach)
        }

        context.commit('setCoaches', coaches)
    }
};