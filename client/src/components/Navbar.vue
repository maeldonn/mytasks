<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- TODO: GO TO HOME ON CLICK -->
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">My</span>
          <span>Tasks</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://maeldonn.github.io/" target="_blank" text>
        <span class="mr-2">Made with ❤️ by maeldonn</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="secondary"></v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  components: {},
  data: () => ({
    drawer: false,
  }),
};
</script>
