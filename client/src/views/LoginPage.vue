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
            <button class="login-btn" type="submit">
                <div class="" v-if="!loading">Login</div>
                <div v-if="loading" class="spinner"></div>
            </button>
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
        const loading = ref(false);

        const login = async () => {
            try {
                loading.value = true;
                const response = await loginUser({ email: email.value, password: password.value });
                setTimeout(() => {
                    if(response.status === 200) {                    
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    successMessage.value = "User logged in successfully.";
                    // Redirect to login or another page
                    router.push('/');
                } else {
                    successMessage.value = 'User registration failed. Please try again.'
                    alert(response.data.message);
                }
                },1000);
            } catch (error) {
                errorMessage.value = error.response.data;
                successMessage.value = '';
                alert(errorMessage.value);

                console.error('Error during registration', error);
            } finally {
                loading.value = false;
            }
        };

        return { email, password, login, loading };
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-btn:hover {
    transition: 2ms ease-in-out;
    color: blue;
    border: 1px solid blue;
}

.link {
  text-decoration: none;
  font-size: 0.75rem;
  color: #000;
  margin-right: auto;
}

.link:hover {
  color: blue;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>