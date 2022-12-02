<template>
    <div>
   <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
   <section>
    <base-card>
        <h2>Requests Received</h2>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests" >
            <RequestsItem v-for="request in receivedRequests" :email="request.email" :message="request.message" :key="request.id"/>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
    </section>
 </div>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
export default {
    components:{RequestsItem},
    data(){
        return {
            isLoading: false,
            error: null
        }
    },
    computed :{
        receivedRequests(){
            return this.$store.getters['requests/requests']  
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests']  
        }
    },
    methods:{
        async loadRequests(){
            this.isLoading=true;
            try{
                await this.$store.dispatch('requests/loadRequests')
            }catch(error){
              this.error = error.message || 'Something went wrong!'
            }
            this.isLoading=false;
        },
        handleError(){
            this.error=null;
        }
    },
    created(){
        this.loadRequests()
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>