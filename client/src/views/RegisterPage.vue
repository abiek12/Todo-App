<template>
    <div class="register-container">
        <h2>Register</h2>
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

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        const response = await registerUser({ email: email.value, password: password.value });
        console.log('User registered successfully', response);
        // Redirect to login or another page
      } catch (error) {
        console.error('Error during registration', error);
      }
    };

    return { email, password, register };
  },
};
</script>