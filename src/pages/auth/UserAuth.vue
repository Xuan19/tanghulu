<template>
  <base-card>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating ..." fixed>
       <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p v-if="!formIsValid">Please enter a valid email and password</p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButton
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false,
    };
  },

  computed: {
    switchModeButton() {
      if (this.mode == 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },

    submitButtonCaption() {
      if (this.mode == 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
  },

  methods: {
    async submitForm() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

       this.isLoading = true;

       const actionPayload ={
           email: this.email,
          password: this.password,
       }

      try {
          if (this.mode === 'login') {
             await this.$store.dispatch('login', actionPayload
            );
          } else {
            await this.$store.dispatch('signup', actionPayload);
          }
          const redirectUrl = '/' +(this.$route.query.redirect || 'coaches')
          this.$router.replace(redirectUrl);
      } catch(error){
         console.log(error.message)
         this.error = error.message || 'Failed to authenticate, try later'
      }

      this.isLoading = false

    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
