<template>
   <section>
    <base-card>
        <h2>Requests Received</h2>
        <ul v-if="hasRequests" >
            <RequestsItem v-for="request in receivedRequests" :email="request.email" :message="request.message" :key="request.id"/>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
    </section>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
export default {
    components:{RequestsItem},
    computed :{
        receivedRequests(){
            return this.$store.getters['requests/requests']  
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests']  
        }
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