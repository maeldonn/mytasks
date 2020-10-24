<template>
  <section class="dashboard">
    <Title content="Dashboard"/>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'Dashboard',
  components: {
    Title,
  },
};
</script>

<style scoped>
  h1 {
    text-align: center;
    margin: 3rem auto;
  }
</style>
