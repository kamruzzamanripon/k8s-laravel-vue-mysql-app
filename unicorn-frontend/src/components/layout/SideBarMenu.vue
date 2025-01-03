<template>
    <div class="bg-white w-64 min-h-[100vh] overflow-y-auto hidden md:block shadow relative ">

        <!-- Brand Logo / Name -->
        <div class="flex items-center px-6 py-3 h-16">
            <router-link to="/" class="text-2xl font-bold tracking-tight text-gray-800" @click="fetchData">Unicorn
                Admin.</router-link>
        </div>
        <!-- @end Brand Logo / Name -->

        <div class="px-4 py-2 min-h-[93vh]  flex flex-col  justify-between ">

            <div>
                <ul>
                    <SidebarItem to="/" label="Dashboard">
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
                <p class="bg-gray-200 text-blue-800 w-9 h-9 rounded-full flex justify-center items-center mt-5">DN</p>
            </div>


        </div>
    </div>
</template>

<script>
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import ChartIcone from '@/components/icons/ChartIcone.vue';
import ChartIconTwo from '@/components/icons/ChartIconTwo.vue';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';
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
import { useUnicornStore } from '@/stores/UnicornStore';
import SidebarItem from './SidebarItem.vue';

export default {
    name: "Nav",
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
        ChevronLeft,
        ChevronRight,

    },
    data() {
        return {
            unicornStore: useUnicornStore()
        }
    },
    methods: {
        logout() {
            alert('logout method')
        },
        fetchData() {
            this.unicornStore.getAllUnicornData();
        }
    },

    computed: {

    }
}
</script>