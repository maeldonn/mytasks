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

const API_URL = 'http://localhost:5000/';

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
    this.connected = this.isConnected();
  },
  methods: {
    isConnected() {
      axios
        .get(API_URL, {
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
