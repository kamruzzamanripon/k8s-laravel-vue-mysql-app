<template>
    <div v-show="isOpen" class="fixed inset-0 z-40 flex">
        <!-- Sidebar -->
        <div class="bg-white w-64 min-h-screen shadow-lg transition-transform transform translate-x-0">
            <div class="px-4 py-2 min-h-[93vh]  flex flex-col  justify-between ">
                <div>
                    <ul>
                        <SidebarItem to="#" label="Dashboard">
                            <template #icon>
                                <ChartIconTwo class="w-7" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Team">
                            <template #icon>
                                <TeamIcon class="w-6" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Projects">
                            <template #icon>
                                <ProjectIcon class="w-6" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Calendar">
                            <template #icon>
                                <CalendarIcon class="w-6" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Documents">
                            <template #icon>
                                <DocumentIcon class="w-6" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Report">
                            <template #icon>
                                <ReportIcon class="w-6" />
                            </template>
                        </SidebarItem>
                    </ul>

                    <hr>
                    <p class="mt-5 text-gray-500">Your teams</p>
                    <ul class="mt-3">
                        <SidebarItem to="#" label="Design">
                            <template #icon>
                                <DesignIcon class="w-7" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Engingeering">
                            <template #icon>
                                <EngingeeringIcon class="w-6" />
                            </template>
                        </SidebarItem>
                    </ul>

                    <hr>
                    <p class="mt-5 text-gray-500">Reports</p>
                    <ul class="mt-3">
                        <SidebarItem to="#" label="Month to Date">
                            <template #icon>
                                <ReportIconTwo class="w-7" />
                            </template>
                        </SidebarItem>

                        <SidebarItem to="#" label="Year to Date">
                            <template #icon>
                                <ReportIconTwo class="w-6" />
                            </template>
                        </SidebarItem>
                    </ul>
                </div>

                <div>
                    <hr>
                    <p class="bg-gray-200 text-blue-800 w-9 h-9 rounded-full flex justify-center items-center mt-5">DN
                    </p>
                </div>


            </div>
        </div>

        <!-- Overlay -->
        <div class="flex-grow bg-black opacity-50" @click="closeSidebar"></div>
    </div>
</template>

<script>
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import ChartIcone from '@/components/icons/ChartIcone.vue';
import ChartIconTwo from '@/components/icons/ChartIconTwo.vue';
import DesignIcon from '@/components/icons/DesignIcon.vue';
import DocumentIcon from '@/components/icons/DocumentIcon.vue';
import EngingeeringIcon from '@/components/icons/EngingeeringIcon.vue';
import InvoiceIcon from '@/components/icons/InvoiceIcon.vue';
import ProjectIcon from '@/components/icons/ProjectIcon.vue';
import ReportIcon from '@/components/icons/ReportIcon.vue';
import ReportIconTwo from '@/components/icons/ReportIconTwo.vue';
import SqureBoxIcon from '@/components/icons/SqureBoxIcon.vue';
import TeamIcon from '@/components/icons/TeamIcon.vue';
import TimerIcone from '@/components/icons/TimerIcon.vue';
import SidebarItem from './SidebarItem.vue';


export default {
    name: "SidebarDrawer",
    components: {
        ChartIcone,
        InvoiceIcon,
        SqureBoxIcon,
        TimerIcone,
        SidebarItem,
        TeamIcon,
        ChartIconTwo,
        ProjectIcon,
        CalendarIcon,
        DocumentIcon,
        ReportIcon,
        ReportIconTwo,
        DesignIcon,
        EngingeeringIcon,

    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeSidebar() {
            this.$emit('close'); // Inform parent to close the sidebar
        },
        logout() {
            alert('Logout method called');
        }
    }
};
</script>

<style scoped>
/* Optional: Add additional styling for smooth transitions */
</style>