<template>
  <nav v-if="isAuthenticated">
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
      if (accessToken) {
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
        router.push('/login');
      }
    };

    const handleAuthChange = () => {
      checkAuth();
    };

    onMounted(() => {
      checkAuth();
      window.addEventListener('authChange', handleAuthChange);
    });


    const logout= async ()=>{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      isAuthenticated.value = false;
      router.push('/login');
      window.dispatchEvent(new Event('authChange'));
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
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

nav button {
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  cursor: pointer;
  border: 1px solid #ccc;
}

nav button:hover {
  border: 1px solid red;
  color: red;
}
</style>
