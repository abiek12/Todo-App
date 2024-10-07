<template>
    <div class="home">
        <h1>Projects</h1>
        <CreateProject @projectCreated="fetchProjects"/>
        <ProjectList :projects="projects" @viewProject="viewProject"/>
        <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="selectedProject = null"/>
    </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import CreateProject from '../components/CreateProject.vue';
import ProjectList from '../components/ProjectList.vue';
import ProjectDetail from '../components/ProjectDetail.vue';
import { fetchAllProjects } from '@/apis/projectServices';

export default { 
    components: {CreateProject, ProjectList, ProjectDetail},
    setup() {
        const projects = ref([]);
        const selectedProject = ref(null);

        const fetchProjects = async () => {
            try {
                projects.value = await fetchAllProjects();
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        }

        const viewProject = (project) => {
            selectedProject.value = project;
        }

        onMounted(fetchProjects);

        return { projects, fetchProjects, selectedProject, viewProject };
    }
}

</script>