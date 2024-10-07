<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="text" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
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