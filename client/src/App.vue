<template>
  <div id="app">
    <Navbar :connected="connected" :isAdmin="isAdmin" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    connected: false,
    isAdmin: false,
  }),
  watch: {
    $route: {
      handler() {
        this.isConnected();
      },
    },
  },
  methods: {
    isConnected() {
      const route = this.$route.path;
      // TODO: isAdmin
      if (route === '/dashboard' || route === '/administration') {
        this.connected = true;
      } else {
        this.connected = false;
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

#app {
  height: 100%;
  font-family: "Roboto", sans-serif;
}
</style>
