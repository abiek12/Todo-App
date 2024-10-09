<template>
    <div class="todo-list" v-if="detailedProject">
        <div class="title-container">
            <h1 v-if="!isEditingTitle">{{ detailedProject.title }}</h1>
            <input class="title-input" v-else v-model="newTitle" @keyup.enter="updateTitle" placeholder="Edit project title"/>

            <button class="edit-btn" @click="toggleEditTitle">
              <i :class="isEditingTitle ? 'fas fa-save' : 'fas fa-edit'"></i>
            </button>
        </div>
        
        <div v-for="todo in detailedProject.todos" :key="todo._id" class="todo-item">
            <input type="checkbox" v-model="todo.status" @change="updateStatus(todo)">
            <label>{{ todo.description }}</label>
            <button class="delete-btn" @click="deleteTodo(todo._id)">
                <i class="fas fa-trash"></i>
            </button>
        </div>

        <CreateTodo :project="detailedProject" @todoAdded="addTodo" />
        <!-- Close button -->
        <button class="close-btn" @click="close">Back</button>
    </div>
    <!-- Loading message -->
    <div v-else class="spinner"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CreateTodo from '../components/CreateTodo.vue';
import { fetchProjectById, updateTodoStatus, updateProjectTitle, deleteTodoItem, addNewTodo } from '@/apis/projectServices';

export default {
    components: { CreateTodo },
    props: {
        project: { type: Object, required: true },
    },
    setup(props) {
        const detailedProject = ref(null);
        const isEditingTitle = ref(false);
        const newTitle = ref('');
        const newTodoDescription = ref('');
        
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

        const toggleEditTitle = () => {
            if (isEditingTitle.value) {
              saveTitle();
            }
            isEditingTitle.value = !isEditingTitle.value;
        };

        const saveTitle = async () => {
            try {
              if (newTitle.value !== detailedProject.value.title) {
                await updateProjectTitle(props.project._id, newTitle.value);
                detailedProject.value.title = newTitle.value;
              }
              isEditingTitle.value = false;
            } catch (error) {
              console.error('Error saving project title:', error);
            }
        };

        const addTodo = async (newTodo) => {
            try {
                const resData = await addNewTodo(props.project._id, newTodo);
                if(resData.status === 201) {               
                    await fetchProject();     
                }
            } catch (error) {
                console.error('Error saving project title:', error);
            }
        }

        const deleteTodo = async (todoId) => {
            try {
                await deleteTodoItem(props.project._id, todoId);
                detailedProject.value.todos = detailedProject.value.todos.filter(todo => todo._id !== todoId);
            } catch (error) {
              console.error('Error saving project title:', error);
            }
        }

        onMounted(fetchProject);
        return { detailedProject, isEditingTitle, newTitle, newTodoDescription, toggleEditTitle, saveTitle, updateStatus, deleteTodo, addTodo };
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.todo-list {
    background: #f4f4f4;
    padding: 2.5rem 8rem;
    border-radius: 1rem;
    width: 50%;
    height: 30rem;
    text-align: start;
}

.todo-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
}

.todo-item:hover {
    border: 1px solid #000;
}

.todo-item input {
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;   
}

.close-btn {
    cursor: pointer;
    border: 1.5px solid #ccc;
    border-radius: 0.2rem;
    background-color: transparent;
    color: #000;
    margin-top: 3rem;
    padding: 0.5rem 1.5rem;
}

.close-btn:hover {
    border: 1.5px solid #000;
    color: #000;
}

.edit-btn {
    cursor: pointer;
    border-radius: 0.2rem;
    color: #000;
    border: 1px solid #ccc;
    padding: 0.5rem 1.5rem;
}

.edit-btn:hover {
    border: 1px solid blue;
    color: blue;
}

.title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.title-input {
    padding: 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    width: 85%;
    margin: 1.6rem 0;
}

.delete-btn {
    cursor: pointer;
    float: right;
    border: none;
}

.delete-btn:hover {
    color: red;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
  margin-top: 5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
