<template>
    <div class="todo-list" v-if="detailedProject">
        <h1>{{ detailedProject.title }}</h1>
        <div v-for="todo in detailedProject.todos" :key="todo._id" class="todo-item">
            <input type="checkbox" v-model="todo.status" @change="updateStatus(todo)">
            <label>{{ todo.description }}</label>
        </div>
        <button @click="close">Close</button>
    </div>
    <!-- Loading message -->
    <div class="todo-list" v-else>
      Loading project details...
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchProjectById, updateTodoStatus } from '@/apis/projectServices';

export default {
    props: {
        project: { type: Object, required: true },
    },
    setup(props) {
        const detailedProject = ref(null);
        
        const fetchProject = async () => {
            try {
                const resData = await fetchProjectById(props.project._id);
                if(resData.status === 200) {
                    detailedProject.value = resData.data;
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        }
        const updateStatus = async (todo) => {
            try {
                await updateTodoStatus(props.project._id, todo._id, todo.status);
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }

        onMounted(fetchProject);
        return { detailedProject, updateStatus };
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style>
.todo-list {
    background: #f4f4f4;
    padding: 1.5rem 0;
    border-radius: 1rem;
    width: 50%;
    height: 30rem;
}
</style>
