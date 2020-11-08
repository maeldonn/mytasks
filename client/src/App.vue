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

import axios from 'axios';

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
  mounted() {
    this.isConnected();
  },
  methods: {
    isConnected() {
      if (localStorage.token) {
        axios
          .get(process.env.VUE_APP_API_URL, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((result) => {
            if (result.data.user.role === 'admin') {
              this.isAdmin = true;
            } else {
              this.isAdmin = false;
            }
            this.connected = true;
          })
          .catch(() => {
            this.connected = false;
            this.isAdmin = false;
            localStorage.removeItem('token');
          });
      } else {
        this.connected = false;
        this.isAdmin = false;
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
}

#app {
  height: 100%;
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
  width: 100%;
  position: relative;
}
</style>
