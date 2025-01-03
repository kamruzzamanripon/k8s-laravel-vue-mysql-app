<template>
    <li>
        <router-link :to="to"
            class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
            <slot name="icon" />
            <span class="ml-2">{{ label }}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: "SidebarItem",
    props: {
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>