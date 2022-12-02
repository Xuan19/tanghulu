export default{
    async registerCoach(context,data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate:data.rate,
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
        const responseDate = await response.json();

        if(!response.ok){
            //
        }

        const coaches = [];

        for(const key in responseDate){
            const coach = {
                id:key,
                firstName: responseDate[key].firstName,
                lastName: responseDate[key].lastName,
                description: responseDate[key].description,
                hourlyRate:responseDate[key].hourlyRate,
                areas: responseDate[key].areas,
            }

            coaches.push(coach)
        }

        context.commit('setCoaches', coaches)


    }
};