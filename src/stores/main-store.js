import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => ({
    app: null,
    servicesURL: 'http://192.168.1.156/:9876',
  })
});