<template>
    <div class="bg-white shadow-sm rounded-lg overflow-hidden border-l-[5px] p-4"
        :class="getRandomBorderColor(data.colour)">
        <!-- Header Section -->
        <div
            class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <!-- Information Columns -->
            <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 w-full lg:w-[80%]">

                <div class="flex justify-between lg:space-x-6 w-full lg:w-[40%]">
                    <div class="w-full lg:w-auto">
                        <p class="text-sm text-gray-500">No</p>
                        <p class="font-semibold text-lg">{{ serialNo }}</p>
                    </div>

                    <div class="w-full lg:w-[80%]">
                        <p class="text-sm text-gray-500">Doctor Name</p>
                        <p class="font-semibold text-lg">{{ data.name }}</p>
                    </div>
                </div>

                <div class="flex justify-between w-full lg:w-auto lg:space-x-6">
                    <div class="w-full lg:w-auto">
                        <p class="text-sm text-gray-500">Age</p>
                        <p class="text-lg">{{ data.age }}</p>
                    </div>

                    <div class="w-full lg:w-auto">
                        <p class="text-sm text-gray-500">Color</p>
                        <p class="text-lg">{{ data.colour }}</p>
                    </div>
                </div>

                <div class="w-full border-b-2 pb-2 lg:border-none lg:pb-0 lg:w-1/4">
                    <p class="text-sm text-gray-500">Status</p>
                    <span
                        :class="`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium ${getStatusClass(data.age)}`">
                        {{ unicornStatus(data) }}
                    </span>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-center w-full lg:w-auto space-x-2">
                <button class="border-2 hover:bg-blue-100 px-3 py-1 rounded-lg font-medium w-16"
                    @click="openUnicornEditModal(data)">
                    Edit
                </button>
                <button
                    class="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-medium w-16 flex items-center justify-center"
                    @click="deleteUnicornItem(data)">
                    <TrashIcon class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Details Section -->
        <hr class="my-4" />
        <div class="border-2 rounded-md m-2" v-if="detailStatus">
            <div class="flex flex-col justify-center items-center bg-[#4E46B41F] rounded-md m-2 p-5">
                <EngingeeringIcon class="w-8 stroke-[#8A82FB] mb-2" />
                <p class="text-center text-[#8A82FB]">
                    The body copy explains the empty state. <br />
                    The icon relates to the situation
                </p>
            </div>
        </div>

        <!-- Toggle Details -->
        <div class="px-4 py-2 flex justify-between items-center">
            <span class="font-medium cursor-pointer" @click="toggleDetailStatus">
                Show details
            </span>
            <ChevronDownIcon class="w-6 h-6 border-2 rounded-full p-1 ml-3 cursor-pointer" @click="toggleDetailStatus"
                v-if="!detailStatus" />
            <ChevronUpIcon class="w-6 h-6 border-2 rounded-full p-1 ml-3 cursor-pointer" @click="toggleDetailStatus"
                v-if="detailStatus" />
        </div>

        <!-- Edit Modal -->
        <UnicornEditModal :show-modal="showUnicornEditModal" :singleUnicornData="data"
            @close-modal="closeUnicornEditModal()" />
    </div>
</template>

<script>
import { useUnicornStore } from '@/stores/UnicornStore';
import ChevronDownIcon from '../icons/ChevronDownIcon.vue';
import ChevronUpIcon from '../icons/ChevronUpIcon.vue';
import EngingeeringIcon from '../icons/EngingeeringIcon.vue';
import TrashIcon from '../icons/TrashIcon.vue';
import UnicornEditModal from '../modal/UnicornEditModal.vue';



export default {
    name: "DashBoard",
    components: {
        TrashIcon,
        ChevronDownIcon,
        EngingeeringIcon,
        ChevronUpIcon,
        UnicornEditModal,


    },
    props: {
        data: Object,
        serialNo: Number
    },
    data() {
        return {
            detailStatus: false,
            showUnicornEditModal: false,
            crudId: null,
            unicornStore: useUnicornStore(),
        }
    },
    methods: {
        toggleDetailStatus() {
            this.detailStatus = !this.detailStatus
        },
        closeUnicornEditModal() {
            this.showUnicornEditModal = false;
            this.crudId = null;
        },
        openUnicornEditModal(data) {
            this.crudId = data._id;
            this.showUnicornEditModal = true;

        },
        async deleteUnicornItem(data) {
            if (confirm('Are you sure?')) {
                console.log('deleteUnicornItem', data)
                await this.unicornStore.deleteUnicornItem(data)
                this.unicornStore.getAllUnicornData();
                this.$emit("close-modal");
            }

        },
        getRandomBorderColor(colour) {
            switch (colour) {
                case 'blue':
                    return 'border-blue-800';
                case 'green':
                    return 'border-green-500';
                case 'yellow':
                    return 'border-yellow-400';
                case 'purple':
                    return 'border-purple-600';
                case 'gray':
                    return 'border-gray-500';
                default:
                    return 'border-gray-800';
            }
        },
        unicornStatus(data) {
            if (data.age >= 0 && data.age <= 8) {
                return "👶 Baby Unicorn";
            } else if (data.age >= 9 && data.age <= 25) {
                return "🦄 Mature Unicorn";
            } else {
                return "👴 Old Unicorn";
            }
        },

        getStatusClass(age) {
            if (age >= 0 && age <= 8) {
                return 'bg-[#FEF3C7] text-[#92400E]'; //  baby unicorns
            } else if (age >= 9 && age <= 25) {
                return 'bg-[#2E7D321F] text-[#2E7D32]'; //  mature unicorns
            } else {
                return 'bg-[#5C33CF1F] text-[#5C33CF]'; //  old unicorns
            }
        },
        computed: {

        }
    }
}
</script>
