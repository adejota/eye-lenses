<template>
  <div id="app" class="min-h-screen h-full min-w-screen w-full bg-full-black">
    <router-view></router-view>
  </div>
</template>

<script>
import 'animate.css'

export default {
  name: 'App',

  data() {
    return {
      darkMode: false,
    }
  },

  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode

      if (this.darkMode) {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
    },
  }
}
</script>
