<template>
    <div class="project-list">
        <h1>All Projects</h1>
        <ul>
            <li v-for="project in projects" :key="project._id" @click="viewProject(project)" class="project">
                {{ project.title }}
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
        // viewProject(project) {
        //     this.$emit('viewProject', project);
        // },
    },
};
</script>

<style>
.project-list {
    background: #f4f4f4;
    border-radius: 1rem;
    width: 50%;
    height: 32rem;
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
</style>
