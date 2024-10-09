<template>
    <div class="add-project">
        <div v-if="!isAdding">
            <button class="plus-btn" @click="isAdding = true">+</button>
        </div>

        <div v-if="isAdding">
            <input type="text" v-model="newProjectTitle" placeholder="Enter project title" />
            <button class="add-btn" @click="submitProject">Add Project</button>
            <button class="cancel-btn" @click="isAdding = false">Cancel</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['projectAdded'],
    setup(props, { emit }) {
        const isAdding = ref(false);
        const newProjectTitle = ref('');

        const submitProject = () => {
            if (newProjectTitle.value.trim() === '') {
                alert('Please enter a project title');
                return;
            }

            // Emit event with the new project title
            emit('projectAdded', newProjectTitle.value);

            // Reset the input and close the form
            newProjectTitle.value = '';
            isAdding.value = false;
        };

        return {
            isAdding,
            newProjectTitle,
            submitProject,
        };
    }
};
</script>

<style scoped>
.add-project {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.add-project input {
    padding: 0.5rem;
    margin-right: 1rem;
    width: 410px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.add-project button {
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
}

.plus-btn {
    background: transparent;
    color: #000;
    border: 1.5px solid #ccc;
    font-weight: 600;
    width: 39rem;
}

.plus-btn:hover {
    border: 2px solid #4CAF50;
    color: #4CAF50;
}

.add-btn {
    border: none;
    background-color: #4CAF50;
    color: white;
}

.cancel-btn {
    border: none;
    background-color: #f44336;
    color: white;
    margin-left: 0.5rem;
}

.add-project button:hover {
    opacity: 0.9;
}
</style>
