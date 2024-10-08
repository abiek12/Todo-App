<template>
    <div class="add-todo">
        <div v-if="!isAdding">
            <button class="plus-btn" @click="isAdding = true">+</button>
        </div>

        <div v-if="isAdding">
            <input type="text" v-model="newTodo" placeholder="Enter todo description" />
            <button class="add-btn" @click="addTodo(newTodo)">Add Todo</button>
            <button class="cancel-btn" @click="isAdding = false">Cancel</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const isAdding = ref(false);
        const newTodo = ref('');
        return {
            isAdding,
            newTodo,
        };
    },
    methods: {
        addTodo(newTodo) {
            this.$emit('todoAdded', newTodo);
            this.newTodo = '';
            this.isAdding = false;
        }
    }
};
</script>

<style scoped>
.add-todo {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
}

.add-todo input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 32.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.add-todo button {
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
}

.plus-btn {
    background: transparent;
    color: #000;
    border: 1.5px solid #ccc;
    font-weight: 600;
    width: 45.2rem;
}

.plus-btn:hover {
    border: 2px solid #4CAF50;
    color: #4CAF50;
}

.add-btn {
    border: none;
    background-color: #4CAF50;
    color: white;
    margin-right: 0.5rem;
}

.cancel-btn {
    border: none;
    background-color: #f44336;
    color: white;
}

.add-project button:hover {
    opacity: 0.9;
}
</style>
