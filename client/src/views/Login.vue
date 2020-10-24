<template>
  <section class="login">
    <Title content="Login" />
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'Login',
  components: {
    Title,
  },
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin: 3rem auto;
}
</style>
