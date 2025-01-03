import axios from 'axios';
import { defineStore } from 'pinia';

export const useUnicornStore = defineStore('UnicornStore', {
  state: () => ({
    unicornData: [],
    temUniornData: [],
    singleUnicornData: {},
    loading: false,
    searchStatus: false,
    toastMessage: {},
    currentPage: 1,
    itemsPerPage: 5,
    crudUniqueId: "/api",  
  }),

  getters: {
    paginatedUnicorns() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.unicornData.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.unicornData.length / this.itemsPerPage);
    },
  },

  actions: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    changePage(page) {
      this.currentPage = page;
    },
    sortUnicorns(option) {
      console.log('createUnicorn', option);
      switch (option) {
        case 'deesc':
          this.unicornData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'asce':
          this.unicornData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'ageDesc':
          this.unicornData.sort((a, b) => b.age - a.age);
          break;
        case 'ageAsce':
          this.unicornData.sort((a, b) => a.age - b.age);
          break;
        default:
          console.log('No valid sorting option selected');
          break;
      }
    },
    searchUnicorn(searchQuery) {
      console.log('filteredUnicorns', searchQuery);
      const query = searchQuery.toLowerCase();
      //this.temUniornData = this.unicornData;
      if (query === '') {
          this.searchStatus = false;
          this.unicornData = this.temUniornData;
      } else {
        let searchData = this.unicornData.filter(unicorn =>
          unicorn.name.toLowerCase().includes(query) ||
          unicorn.colour.toLowerCase().includes(query)
        );

        this.unicornData = searchData;
        this.searchStatus = true;
        if(searchData.length <= 0){
          this.toastMessage = {
            type: 'error',
            message: "Your Search Item didn't found"
          };
        }
        console.log('filteredUnicorns-2', searchData);
      }
    },
    clearSearch(){
      this.unicornData = this.temUniornData;
    },
    async getAllUnicornData() {
      this.loading = true;
      try {
        //let crudUniqueId = import.meta.env.VITE_CRUD_UNIQUE_ID;
        const result = await axios.get(`${this.crudUniqueId}/unicorns`);
        this.unicornData = result.data;
        this.temUniornData = result.data;
        console.log('axior data', result);
      }
      catch (error) {
        console.log('error', error)
      }
      finally {
        this.loading = false;
      }
    },
    async createUnicorn(data) {
      this.loading = true;
      try {
        console.log('createUnicorn', data);
        //let crudUniqueId = import.meta.env.VITE_CRUD_UNIQUE_ID;
        //await this.sleep(1000); //For testing Loader
        await axios.post(`${this.crudUniqueId}/unicorns`, data);
        this.toastMessage = {
          type: 'success',
          message: "New Unicorn created successfully"
        };
      }
      catch (error) {
        console.log('error', error)
        this.toastMessage = {
          type: 'error',
          message: "Failed to create Unicorn"
        };
      }
      finally {
        this.loading = false;
      }
    },
    async editUnicornItem(data) {
      this.loading = true;
      console.log('editUnicornItem', data.id)
      try {

        //let crudUniqueId = import.meta.env.VITE_CRUD_UNIQUE_ID;
        //await this.sleep(1000); //For testing Loader
        let payload = {
          age: data.age,
          name: data.name,
          colour: data.colour
        }
        const result = await axios.put(`${this.crudUniqueId}/unicorns/${data.id}`, payload);
        this.toastMessage = {
          type: 'success',
          message: "Unicorn Item Update successfully"
        };
        console.log('result-1', result);
      }
      catch (error) {
        console.log('error', error)
      }
      finally {
        this.loading = false;
      }
    },
    async deleteUnicornItem(data) {
      this.loading = true;
      console.log('editUnicornItem', data)
      try {
        //let crudUniqueId = import.meta.env.VITE_CRUD_UNIQUE_ID;
        await axios.delete(`${this.crudUniqueId}/unicorns/${data.id}`);
        this.toastMessage = {
          type: 'error',
          message: `${data.name} deleted from the database`
        };

      }
      catch (error) {
        console.log('error', error)
      }
      finally {
        this.loading = false;
      }
    },
    async updateUniqueId(id){
      console.log('unique id', id)
      this.crudUniqueId = id;
    }


  }
});
