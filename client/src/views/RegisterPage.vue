<template>
    <div class="register-container">
        <h2>Register</h2>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>
                <input type="text" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue';
import {registerUser} from '../apis/authServices.ts';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const successMessage = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const register = async () => {
      try {
        const response = await registerUser({ email: email.value, password: password.value });

        if(response.status === 200) {
          successMessage.value = 'User registered successfully. Please login.'          
          alert(response.data.message);

          // Redirect to login or another page
          setTimeout(() => {
            router.push('/login');
          },1000)

        } else {
          successMessage.value = 'User registration failed. Please try again.'
          alert(response.data.message);
        }

      } catch (error) {
        errorMessage.value = error.response.data;
        successMessage.value = '';
        alert(errorMessage.value);

        console.error('Error during registration', error);
      }
    }
    return { email, password, register };
  },
};
</script>

<style>
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
