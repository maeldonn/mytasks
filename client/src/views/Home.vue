<template>
  <section class="home">
    <Title content="Home"/>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'Home',
  components: {
    Title,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}

  h1 {
    text-align: center;
    margin: 3rem auto;
  }
</style>
