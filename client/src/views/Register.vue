<template>
  <section class="register">
    <Title content="Register" />
    <div>
      <img v-if="isLoading" src="../assets/spinner.svg" class="spinner" />
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <form v-if="!isLoading" @submit.prevent="register">
      <section class="section-register">
        <input
          v-model="user.email"
          type="email"
          id="email"
          autocomplete="off"
          required
        />
        <label for="email" class="label-email">
          <span class="content-email">Email</span>
        </label>
      </section>
      <!-- <section class="section-register">
        <input
          v-model="user.password"
          type="password"
          id="password"
          autocomplete="off"
          required
        />
        <label for="password" class="label-password">
          <span class="content-password">Password</span>
        </label>
      </section>
      <section class="section-register">
        <input
          v-model="user.confirmPassword"
          type="password"
          id="confirm-password"
          autocomplete="off"
          required
        />
        <label for="confirm-password" class="label-confirm-password">
          <span class="content-confirm-password">Password confirmation</span>
        </label>
      </section> -->
    </form>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'Register',
  components: {
    Title,
  },
  data: () => ({
    isLoading: false,
    errorMessage: '',
    user: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),
  methods: {
    register() {
      console.log('test');
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  align-items: center;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin: 3rem auto;
}

.section-register {
  position: relative;
  height: 50px;
  overflow: hidden;
  margin: 2em auto;
}

.section-register input {
  width: 100%;
  height: 100%;
  font-size: 20px;
  padding-top: 20px;
  border: none;
  outline: none;
  background: none;
}

.section-register label {
  position: absolute;
  bottom: 0px;
  left: 0%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid black;
}

.section-register label::after {
  content: "";
  position: absolute;
  left: 0px;
  bottom: -1px;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid #dea90f;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.content-email {
  position: absolute;
  bottom: 5px;
  left: 0px;
  transition: all 0.3s ease;
}

.section-register input:focus + .label-email .content-email,
.section-register input:valid + .label-email .content-email {
  transform: translateY(-150%);
  font-size: 14px;
  color: #dea90f;
}

.section-register input:focus + .label-email::after,
.section-register input:valid + .label-email::after {
  transform: translateX(0%);
}
</style>
