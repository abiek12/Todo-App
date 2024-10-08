<template>
    <div class="register-container">
        <h1>Register</h1>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <form @submit.prevent="register" class="register-form">
            <div class="email-container">
                <label for="email">Email:</label>
                <br>
                <input type="text" v-model="email" required placeholder="Enter your email">
            </div>
            <div class="password-container">
                <label for="password">Password:</label>
                <br>
                <input type="password" v-model="password" required placeholder="Enter your password">
            </div>
            <router-link class="link" to="/login">Already have an account? Login here</router-link>
            <button class="register-btn" type="submit">Register</button>
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

<style scoped>
.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.register-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

label {
    float: left;
    font-size: 0.85rem;
}

input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 402px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.register-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    width: 10rem;
    margin-top: 1rem;
    border: 1px solid #000;
}

.register-btn:hover {
    transition: 2ms ease-in-out;
    color: blue;
    border: 1px solid blue;
}

.link {
  text-decoration: none;
  font-size: 0.8rem;
  color: #000;
  margin-right: auto;
}

.link:hover {
  color: blue;
}
</style>
