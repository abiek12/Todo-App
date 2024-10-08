<template>
    <div class="home">
        <!-- <CreateProject @projectCreated="fetchProjects"/> -->
        <ProjectList v-if="!selectedProject" :projects="projects" @viewProject="viewProject" @deleteProject="deleteProject"/>
        <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="selectedProject = null"/>
    </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import ProjectList from '../components/ProjectList.vue';
// import CreateProject from '@/components/CreateProject.vue';
import ProjectDetail from '@/components/ProjectDetail.vue';
import { fetchAllProjects, deleteProjectById } from '@/apis/projectServices';

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

        // Delete a project by ID
        const deleteProject = async (projectId) => {
          try {
            const response = await deleteProjectById(projectId);
            if(response.status === 200) {
                await fetchProjects();
                selectedProject.value = null;
            }
          } catch (error) {
            console.error('Error deleting project:', error);
          }
        };

        const viewProject = (project) => {
            selectedProject.value = project;
        }

        onMounted(fetchProjects);

        return { projects, fetchProjects, selectedProject, viewProject, deleteProject };
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