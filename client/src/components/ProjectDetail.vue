<template>
    <div class="project-detail">
        <h1>{{ project.title }}</h1>
        <button @click="close">Close</button>
        <div class="todos">
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        project: { type: Object, required: true },
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style>
.project-detail {
    background: #f4f4f4;
    padding: 1.5rem 0;
    border-radius: 1rem;
    width: 50%;
    height: 30rem;
}
</style>
