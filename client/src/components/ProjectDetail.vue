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
    padding: 2.5rem 8rem;
    border-radius: 1rem;
    width: 50%;
    height: 30rem;
    text-align: start;
}

.todo-list button {
    margin: 3rem 0 0 1rem;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
}

.todo-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
}

.todo-item input {
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    
}
</style>
