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
.dashboard {
  height: 85%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
