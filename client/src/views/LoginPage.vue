<template>
    <div class="login-container">
        <h2>Register</h2>
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
import ref from 'vue';
import {loginUser} from '../apis/authServices.ts';

export default {
    setup() {
        const email = ref('');
        const password = ref('');

        const login = async () => {
            try {
                const response = await loginUser({ email: email.value, password: password.value });
                console.log('User registered successfully', response);
                // Redirect to login or another page
            } catch (error) {
                console.error('Error during registration', error);
            }
        };

        return { email, password, login };
    }
}
</script>