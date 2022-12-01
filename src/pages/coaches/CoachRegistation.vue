<template>
    <section>
        <base-card>
            <coach-form @save-data="saveDate"></coach-form>
        </base-card>

    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
    components: {
        CoachForm
    },
    methods:{
        saveDate(data){
            this.$store.dispatch('coaches/registerCoach',data);
            this.$router.replace('/coaches');
        }
    }
}
</script>

<style>

</style>