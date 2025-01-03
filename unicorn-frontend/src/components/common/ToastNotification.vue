<template>
    <div class="fixed bottom-0 right-0 m-4 space-y-2 z-50">
        <div v-for="toast in toasts" :key="toast.key" :class="[
            'px-4 py-2 rounded shadow-md flex items-center space-x-4',
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]">
            <span>{{ toast.message }}</span>
            <CloseIcon class="w-5 h-5 bg-white/50 rounded-full stroke-black cursor-pointer"
                @click="closeToast(toast.key)" />
        </div>
    </div>
</template>

<script setup>
import { useUnicornStore } from "@/stores/UnicornStore";
import { nanoid } from 'nanoid';
import { ref, watch } from 'vue';
import CloseIcon from "../icons/CloseIcon.vue";

const unicornStore = useUnicornStore();
const toasts = ref([]);

// Function 
const addToast = (type, message) => {
    const newToast = {
        key: nanoid(6),
        type,
        message,
    };
    toasts.value.push(newToast);

    // Remove the toast after 5 seconds
    setTimeout(() => {
        toasts.value = toasts.value.filter((toast) => toast.key !== newToast.key);
    }, 5000); // Change the timeout to 5000ms (5 seconds)
};

const closeToast = (key) => {
    toasts.value = toasts.value.filter((toast) => toast.key !== key);
}


watch(
    () => unicornStore.toastMessage,
    (newToast) => {
        if (newToast && newToast.message) {
            addToast(newToast.type, newToast.message);
            // Reset the toastMessage after adding toasts to prevent duplicates
            unicornStore.toastMessage = {};
        }
    }
);
</script>

<style scoped>
/* Optional: Add any styles or animations if needed */
</style>