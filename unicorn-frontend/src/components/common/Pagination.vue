<template>
    <div class="flex justify-center items-center space-x-2 mt-4">
        <!-- Previous Button -->
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="border-2 border-gray-600 hover:bg-blue-500 hover:text-white text-gray-800 px-4 py-2 rounded disabled:opacity-50">
            <ChevronLeft class="w-4" />
        </button>

        <!-- Page Number Buttons -->
        <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="[
            'px-3 py-1 rounded',
            page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-300 hover:bg-blue-500 hover:text-white'
        ]">
            {{ page }}
        </button>

        <!-- Next Button -->
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="border-2 border-gray-600 hover:bg-blue-500 hover:text-white text-gray-800 px-4 py-2 rounded disabled:opacity-50">
            <ChevronRight class="w-4" />
        </button>
    </div>
</template>

<script>
import ChevronLeft from '../icons/ChevronLeft.vue';
import ChevronRight from '../icons/ChevronRight.vue';

export default {
    name: "Pagination",
    components: {
        ChevronRight,
        ChevronLeft,
    },
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        onPageChange: {
            type: Function,
            required: true,
        },
    },
    methods: {
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.onPageChange(page);
            }
        },
    },
};
</script>