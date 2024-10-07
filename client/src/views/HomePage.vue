<template>
    <div class="home">
        <!-- <CreateProject @projectCreated="fetchProjects"/> -->
        <ProjectList v-if="!selectedProject" :projects="projects" @viewProject="viewProject"/>
        <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="selectedProject = null"/>
    </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import ProjectList from '../components/ProjectList.vue';
// import CreateProject from '@/components/CreateProject.vue';
import ProjectDetail from '@/components/ProjectDetail.vue';
import { fetchAllProjects } from '@/apis/projectServices';

export default { 
    components: {ProjectList, ProjectDetail},
    setup() {
        const projects = ref([]);
        const selectedProject = ref(null);

        const fetchProjects = async () => {
            try {
                const projectsData = await fetchAllProjects();
                projects.value = projectsData.data;
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

<style>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>