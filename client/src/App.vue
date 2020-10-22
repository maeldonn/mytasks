<template>
  <div id="app">
    <Navbar :connected="connected" :isAdmin="isAdmin"/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    connected: false,
    isAdmin: false,
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

#app {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
</style>
