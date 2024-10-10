<template>
    <div class="home">
        <ProjectList v-if="!selectedProject" :projects="projects" @viewProject="viewProject" @deleteProject="deleteProject"/>
        <CreateProject v-if="!selectedProject" @projectAdded="addProject"/>
        <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="close"/>
        <!-- Loading message -->
        <div v-if="loading" class="spinner"></div>
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
        const loading = ref(false);

        // Fetch all projects
        const fetchProjects = async () => {
            try {
                loading.value = true;
                const projectsData = await fetchAllProjects();
                projects.value = projectsData.data;
                loading.value = false;
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

        const close = async () => {
            selectedProject.value = null;
            projects.value = [];
            await fetchProjects();
        }

        const viewProject = (project) => {
            selectedProject.value = project;
        }

        onMounted(fetchProjects);

        return { projects, fetchProjects, selectedProject, viewProject, deleteProject, addProject, loading, close };
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

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
  margin-top: 2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>