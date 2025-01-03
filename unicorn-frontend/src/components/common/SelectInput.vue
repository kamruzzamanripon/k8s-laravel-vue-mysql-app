<template>
    <select :class="`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`"
        ref="selectInput" v-model="selectedValue" @change="updateValue">
        <option value="">Select Item</option>
        <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: 'SelectInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        const selectInput = ref(null);
        const selectedValue = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (newValue) => {
                selectedValue.value = newValue;
            }
        );

        const updateValue = () => {
            emit('update:modelValue', selectedValue.value);
        };

        return {
            selectInput,
            selectedValue,
            updateValue,
        };
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>