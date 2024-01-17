import { defineStore } from 'pinia'

export const useLayOutSettingsStore = defineStore('settingsStore', {
  state: () => {
    return {
      fold: false,
    }
  },
})
