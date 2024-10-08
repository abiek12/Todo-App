<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login" class="login-form">
            <div class="email-container">
                <label for="email">Email:</label>
                <br>
                <input type="text" v-model="email" placeholder="Enter your email" required>
            </div>
            <div class="password-container">
                <label for="password">Password:</label>
                <br>
                <input type="password" v-model="password" placeholder="Enter your password" required>
            </div>
            <router-link class="link" to="/register">Don't have an account? Register here</router-link>
            <button class="login-btn" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue';
import {loginUser} from '../apis/authServices.ts';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const successMessage = ref('');
        const errorMessage = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                const response = await loginUser({ email: email.value, password: password.value });
                if(response.status === 200) {                    
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    successMessage.value = "User logged in successfully.";
                    alert(response.data.message);
                    // Redirect to login or another page
                    setTimeout(() => {
                        router.push('/home');
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
        };

        return { email, password, login };
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.login-form {
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

.login-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    width: 10rem;
    margin-top: 1rem;
    border: 1px solid #000;
}

.login-btn:hover {
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