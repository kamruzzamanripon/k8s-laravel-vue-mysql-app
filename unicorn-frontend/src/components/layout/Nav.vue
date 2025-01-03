<template>
    <div class="px-4 md:px-8 py-2 h-16 flex justify-between items-center shadow-sm bg-white">
        <div class="flex items-center w-2/3">
            <input
                class="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white border border-transparent focus:border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal hidden md:block placeholder-gray-700 mr-10"
                type="text" placeholder="Search..." v-model="search" />
            <button class="bg-red-500 text-white p-1 px-3 rounded-md" v-if="unicornStore.searchStatus"
                @click="clearSearch">Clear</button>

            <div class="p-2 rounded-full hover:bg-gray-200 cursor-pointer md:hidden">
                <MenuBarIcone @click="toggleMobileSidebar" />
            </div>
            <div class="text-xl font-bold tracking-tight text-gray-800 md:hidden ml-2">
                Unicorn Admin
            </div>
        </div>

        <div class="flex items-center">
            <a href="#"
                class="text-gray-500 p-2 rounded-full hover:text-blue-600 hover:bg-gray-200 cursor-pointer mr-4">
                <BellIcon />
            </a>

            <!-- Profile Icon with Dropdown -->
            <div class="relative">
                <!-- Trigger: Profile Icon -->
                <div class="cursor-pointer font-bold w-10 h-10 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full"
                    @click="toggleDropdown">
                    JD
                </div>

                <!-- Dropdown Menu -->
                <div v-show="open"
                    class="absolute top-0 mt-12 right-0 w-48 bg-white py-2 shadow-md border border-gray-100 rounded-lg z-40"
                    ref="dropdown">
                    <router-link to="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600">Edit
                        Profile</router-link>
                    <!-- <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600">Account Settings</a> -->
                    <button class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                        @click="logout">Sign Out</button>
                </div>
            </div>
        </div>

        <MobileSideBarMenu :isOpen="isSidebarOpen" @close="toggleMobileSidebar" />
    </div>
</template>

<script>
import BellIcon from '@/components/icons/BellIcon.vue';
import MenuBarIcone from '@/components/icons/MenuBarIcone.vue';
import { useUnicornStore } from '@/stores/UnicornStore';
import MobileSideBarMenu from './MobileSideBarMenu.vue';

export default {
    name: 'Nav',
    components: { BellIcon, MenuBarIcone, MobileSideBarMenu },
    setup() {

    },
    data() {
        return {
            open: false,
            isSidebarOpen: false,
            unicornStore: useUnicornStore(),
            search: ''
        };
    },
    computed: {
        user() {
            return this.userInfoStore.user;
        },
        userName() {
            const firstNameInitial = this.user?.first_name?.[0]?.toUpperCase() || '';
            const lastNameInitial = this.user?.last_name?.[0]?.toUpperCase() || '';
            return `${firstNameInitial}${lastNameInitial}`;
        },
    },
    methods: {
        toggleDropdown() {
            this.open = !this.open;
        },
        toggleMobileSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        handleClickOutside(event) {
            if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
                //this.open = false; 
            }
        },
        logout() {
            alert('logout method')
        },
        searchUnicorn() {
            this.unicornStore.searchUnicorn(this.search)
        },
        clearSearch() {
            this.search = "";
            this.unicornStore.clearSearch();
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    watch: {
        search: {
            handler(newValue) {
                console.log('search-1', newValue)
                this.unicornStore.searchUnicorn(newValue)
            },
            deep: true,
        }
    }
};
</script>