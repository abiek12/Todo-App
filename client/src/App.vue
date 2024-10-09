<template>
  <nav v-if="isAuthenticated">
    <router-link to="/">Home</router-link>
    <button @click="logout">Logout</button>
  </nav>
  <router-view/>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false);

    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        isAuthenticated.value = true;
      }
    };

    onMounted(checkAuth);

    const logout= async ()=>{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Redirect to the login page
      router.push('/login');
    }

    return { logout, isAuthenticated, checkAuth };
  }
}
</script>

<style>
*{
  background: #f4f4f4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5rem;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
