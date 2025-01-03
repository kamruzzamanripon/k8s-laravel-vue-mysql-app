<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-[70]">
        <div class="modal-overlay"></div>
        <div class="modal-container bg-white mx-auto rounded-lg shadow-lg z-50 overflow-hidden">
            <div class="modal-content p-6 pr-3">
                <div class="modal-content-wrapper">
                    <div class="pb-4">
                        <div class="flex items-center justify-between mb-4 px-4  z-40 sticky top-0 border-b">
                            <h3 class="text-xl font-bold mb-3">Edit Unicorn </h3>
                        </div>

                        <form class="bg-white shadow-md p-4 rounded-md" @submit="editUnicornItem">
                            <div class="space-y-3">
                                <div class="space-y-3">
                                    <label class="block font-medium text-lg" for="name">Name</label>
                                    <input type="text" id="name" placeholder="Write Name"
                                        class="border w-full p-2 rounded-md" :class="{ 'border-red-500': errors.name }"
                                        v-model="data.name">
                                    <small class="text-gray-500 pt-4">This is the unicorn name</small> <br>
                                    <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
                                </div>
                                <div class="space-y-3">
                                    <label class="block font-medium text-lg" for="age">Age</label>
                                    <input type="number" id="age" placeholder="Write age"
                                        class="border w-full p-2 rounded-md" :class="{ 'border-red-500': errors.age }"
                                        v-model="data.age">
                                    <small v-if="errors.age" class="text-red-500">{{ errors.age }}</small>
                                </div>
                                <div class="space-y-3">
                                    <label class="block font-medium text-lg" for="color">Color</label>
                                    <SelectInput class="border w-full p-2 rounded-md"
                                        :class="{ 'border-red-500': errors.colour }" :options="colorList"
                                        v-model="data.colour" />
                                    <small v-if="errors.colour" class="text-red-500">{{ errors.colour }}</small>
                                </div>
                            </div>

                            <div class="flex justify-end mt-6">
                                <button
                                    class="border-2 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center space-x-3"
                                    @click="closeModal">Cancel</button>
                                <button
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center space-x-3">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUnicornStore } from "@/stores/UnicornStore";
import SelectInput from "../common/SelectInput.vue";
import CloseIcon from "../icons/CloseIcon.vue";
export default {
    components: {
        CloseIcon,
        SelectInput,

    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        singleUnicornData: Object


    },
    data() {
        return {
            unicornStore: useUnicornStore(),
            data: {
                age: "",
                name: "",
                colour: "",
                _id: ""
            },
            colorList: [
                'green',
                'blue',
                'yellow',
                'purple',
                'gray',
            ],
            errors: {},
            validationSchema: {
                name: {
                    required: true,
                    message: "Name is required",
                },
                age: {
                    required: true,
                    message: "Age is required",
                },
                colour: {
                    required: true,
                    message: "Color is required",
                },
            },
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        closeModal() {
            this.$emit("close-modal");

        },
        validateField(field) {
            const rule = this.validationSchema[field];
            if (rule.required && !this.data[field]) {
                this.errors[field] = rule.message;
            } else {
                delete this.errors[field];
            }
        },
        validateForm() {
            this.errors = {};
            Object.keys(this.validationSchema).forEach((field) => {
                this.validateField(field);
            });
            return Object.keys(this.errors).length === 0;
        },
        async editUnicornItem(e) {
            e.preventDefault();
            if (!this.validateForm()) return;
            await this.unicornStore.editUnicornItem(this.data);
            this.unicornStore.getAllUnicornData();
            this.$emit("close-modal");

        }
    },
    computed: {

    },
    watch: {
        singleUnicornData: {
            immediate: true,
            handler(newValue) {
                console.log('watch-1', newValue)
                this.data = { ...newValue };
            },

        }
    },
};
</script>

<style scoped>
.modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
}

.modal-container {
    max-height: 98vh;
    width: 32rem;
    z-index: 9999999;
}

.modal-content-wrapper {
    max-height: 98vh;
    border-radius: 0.5rem;

}

/* .modal-content {
  max-height: calc(80vh - 2rem);
  
} */

.modal-close {
    color: #4a4a4a;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
}
</style>
