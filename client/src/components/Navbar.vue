<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <h1>MyTasks</h1>
      <!-- TODO: Set up a router-link to go home-->
    </div>

    <v-spacer></v-spacer>

    <v-btn href="https://github.com/maeldonn" target="_blank" text>
      <span class="mr-2">Visit my Github</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  props: {},
};
</script>
