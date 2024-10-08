<template>
    <div class="home">
        <ProjectList v-if="!selectedProject" :projects="projects" @viewProject="viewProject" @deleteProject="deleteProject"/>
        <CreateProject v-if="!selectedProject" @projectAdded="addProject"/>
        <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="selectedProject = null"/>
    </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import ProjectList from '../components/ProjectList.vue';
import CreateProject from '@/components/CreateProject.vue';
import ProjectDetail from '@/components/ProjectDetail.vue';
import { fetchAllProjects, deleteProjectById, createNewProject } from '@/apis/projectServices';

export default { 
    components: {ProjectList, ProjectDetail, CreateProject},
    setup() {
        const projects = ref([]);
        const selectedProject = ref(null);

        // Fetch all projects
        const fetchProjects = async () => {
            try {
                const projectsData = await fetchAllProjects();
                projects.value = projectsData.data;
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        }

        // Add a new project
        const addProject = async (title) => {
            try {                                
                const response = await createNewProject({"title": title});                
                if (response.status === 201) {
                    projects.value.push(response.data);
                }
            } catch (error) {
                console.error('Error adding project:', error);
            }
        };

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

        return { projects, fetchProjects, selectedProject, viewProject, deleteProject, addProject };
    }
}

</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>