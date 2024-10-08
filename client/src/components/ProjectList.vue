<template>
    <div class="project-list">
        <h1>All Projects</h1>
        <ul>
            <li v-for="project in projects" :key="project._id" @click="viewProject(project)" class="project">
                {{ project.title }}
                <button class="delete-btn" @click.stop="deleteProject(project._id)">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        projects: { type: Array, required: true },
    },
    methods: {
        viewProject(project) {
            this.$emit('viewProject', project);
        },
        deleteProject(projectId) {
            this.$emit('deleteProject', projectId);
        },
    },
};
</script>

<style scoped>
.project-list {
    padding: 1.5rem 0 1rem 0;
    border-radius: 1rem;
    width: 50%;
    min-height: auto;
}

.project {
    cursor: pointer;
    border-radius: 0.4rem;
    padding: 0.5rem;
    margin: 0.5rem 3rem;
    background: #c8c8c8;
}

.project:hover {
    color: rgb(57, 40, 238);
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 0;
}

.delete-btn {
    margin: 0;
    position: absolute;
    right: 27rem;
    padding: 0.1rem 1rem;
    cursor: pointer;
    border: none;
    background: transparent;
}

.delete-btn:hover {
    color: red;
}
</style>
