<template>
    <div>
        <Loader :show="isLoading" />
        <!-- title and crate button -->
        <div class="flex  items-center justify-between mb-5">
            <p class="lg:text-2xl font-bold">Welcome John Doe</p>
            <div>

                <button type="button"
                    class="text-white bg-[#4E46B4] hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-2 py-2 lg:px-5 lg:py-2.5 me-2 mb-2 dark:bg-[#4E46B4] focus:outline-none dark:focus:ring-blue-800 flex items-center space-x-3"
                    @click="openUnicornCreateModal">
                    <StopIcon class="w-7 hidden lg:block" />
                    <span>Create Unicorn</span>
                </button>
            </div>
        </div>
        <!-- end title and crate button -->

        <!-- Doctor card Info -->
        <div class="space-y-3">

            <div v-if="unicornData.length > 0">
                <select class="w-52 p-2 rounded-md" @change="sortUnicorns($event)">
                    <option value="">Sorting Option </option>
                    <option value="deesc">Descending </option>
                    <option value="asce">Ascending</option>
                    <option value="ageDesc">Age Descending</option>
                    <option value="ageAsce">Age Ascending</option>
                </select>
            </div>
            <!-- <DoctorCardInfo v-for="(data, index) in unicornData" :data="data" :serialNo="index" :key="index" /> -->

            <DoctorCardInfo v-for="(data, index) in paginatedUnicorns" :data="data"
                :serialNo="index + 1 + ((currentPage - 1) * itemsPerPage)" :key="data._id" />

            <Pagination :currentPage="currentPage" :totalPages="totalPages" :onPageChange="changePage"
                v-if="unicornData.length > 0" />

            <div class="flex flex-col bg-orange-300 rounded-md shadow-md p-3" v-if="unicornData.length == 0">
                <p class="font-bold text-center p-2">This App run by CRUD Api. If Data didn't show then create a unicorn
                    item Or create new unique id below this site and replace in env file </p>
                <a href="https://crudcrud.com/" target="_blank" class="text-center text-[#4E46B4] font-medium">CRUD Api
                    site Link</a>

                <br>
                <div class="flex flex-col space-y-4">
                    <input class="h-8 px-4" type="text" placeholder="Type CRUD Unique Id" v-model="crudUniqueId">
                    <div class="flex justify-center">
                        <button class="bg-green-700 w-28 text-white p-2 rounded-md"
                            @click="submitCrudId">Submit</button>
                    </div>
                </div>

            </div>
        </div>
        <!-- End Doctor card Info -->

        <!-- Modals -->
        <UnicornCreateModal :show-modal="showUnicornCreateModal" @close-modal="closeUnicornCreateModal" />
    </div>
</template>

<script>
import Loader from '@/components/common/Loader.vue';
import Pagination from '@/components/common/Pagination.vue';
import DoctorCardInfo from '@/components/dashboard/DoctorCardInfo.vue';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
import EngingeeringIcon from '@/components/icons/EngingeeringIcon.vue';
import StopIcon from '@/components/icons/StopIcon.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import UnicornCreateModal from '@/components/modal/UnicornCreateModal.vue';
import { useUnicornStore } from '@/stores/UnicornStore';

export default {
    name: "DashBoard",
    components: {
        StopIcon,
        TrashIcon,
        ChevronDownIcon,
        EngingeeringIcon,
        DoctorCardInfo,
        UnicornCreateModal,
        Loader,
        Pagination,
    },

    data() {
        return {
            crudUniqueId: '',
            showUnicornCreateModal: false,
            unicornStore: useUnicornStore(),

        }
    },
    mounted() {
        this.unicornStore.getAllUnicornData();
    },
    methods: {
        closeUnicornCreateModal() {
            this.showUnicornCreateModal = false;
        },
        openUnicornCreateModal() {
            this.showUnicornCreateModal = true;
        },
        changePage(page) {
            this.unicornStore.changePage(page);
        },
        sortUnicorns(event) {
            const option = event.target.value;
            console.log('sortUnicorns', option)
            this.unicornStore.sortUnicorns(option);
        },
        async submitCrudId() {
            if (this.crudUniqueId.trim() === '') {
                alert('Please enter a valid CRUD unique ID.');
                return;
            }

            // Save the ID in localStorage
            localStorage.setItem('VITE_CRUD_UNIQUE_ID', this.crudUniqueId);
            alert('CRUD Unique ID saved successfully!');
            let Id = this.crudUniqueId
            await this.unicornStore.updateUniqueId(Id)
            let data = {
                "age": "30",
                "name": "jone Doe",
                "colour": "blue"
            }
            await this.unicornStore.createUnicorn(data);
            await this.unicornStore.getAllUnicornData();
        },

    },
    computed: {
        unicornData() {
            return this.unicornStore.unicornData;
        },
        isLoading() {
            return this.unicornStore.loading;
        },
        paginatedUnicorns() {
            return this.unicornStore.paginatedUnicorns;
        },
        totalPages() {
            return this.unicornStore.totalPages;
        },
        currentPage() {
            return this.unicornStore.currentPage;
        },
        itemsPerPage() {
            return this.unicornStore.itemsPerPage;
        },
    },
    watch: {
        // Watch for changes in unicornData to recalculate pagination
        unicornData: {
            handler() {
                this.changePage(1); // Reset to page 1 after sorting
            },
            deep: true,
        },
    },
}
</script>
