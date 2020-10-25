<template>
  <section class="login">
    <Title content="Login" />
    <div class="spinner" v-if="isLoading">
      <img src="../assets/spinner.svg" />
    </div>
    <div class="error" :class="errorMessage ? 'active' : null">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <form v-if="!isLoading" @submit.prevent="login">
      <section class="form-section">
        <input
          v-model="user.email"
          type="text"
          id="email"
          autocomplete="off"
          required
        />
        <label for="email" class="label">
          <span class="content">Email</span>
        </label>
      </section>
      <section class="form-section">
        <input
          v-model="user.password"
          type="password"
          id="password"
          autocomplete="off"
          required
        />
        <label for="password" class="label">
          <span class="content">Password</span>
        </label>
      </section>
      <button type="submit">LOGIN</button>
    </form>
  </section>
</template>

<script>

import Joi from 'joi';
import axios from 'axios';

import Title from '@/components/Title.vue';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).required(),
});

export default {
  name: 'Login',
  components: {
    Title,
  },
  data: () => ({
    isLoading: false,
    errorMessage: '',
    user: {
      email: '',
      password: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    login() {
      if (this.validUser()) {
        this.isLoading = true;
        axios
          .post(
            LOGIN_URL,
            {
              email: this.user.email,
              password: this.user.password,
            },
            {
              headers: {
                'content-type': 'application/json',
              },
            },
          )
          .then((result) => {
            localStorage.token = result.data.token;
            setTimeout(() => {
              this.isLoading = false;
              this.$router.push('/dashboard');
            }, 1000);
          })
          .catch(() => {
            setTimeout(() => {
              this.impossibleToConnect();
            }, 1000);
          });
      }
    },
    validUser() {
      this.errorMessage = '';
      const value = userSchema.validate(this.user);
      if (!value?.error) {
        return true;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.impossibleToConnect();
      }, 1000);
      return false;
    },
    impossibleToConnect() {
      document.getElementById('email').focus();
      this.user.password = '';
      this.isLoading = false;
      this.errorMessage = 'Connexion impossible.'; // BUG: Ne s'affiche jamais
    },
  },
};
</script>

<style scoped>
.login {
  height: 85%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.spinner {
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  max-width: 70%;
  height: 60px;
  margin: 0rem 2rem;
  padding: 1rem 2rem;
  color: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background: #b33a3a;
}

form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 3em;
}

.form-section {
  position: relative;
  height: 50px;
  overflow: hidden;
  margin: 2em auto;
}

.form-section input {
  width: 100%;
  height: 100%;
  font-size: 20px;
  padding-top: 20px;
  border: none;
  outline: none;
  background: none;
}

.form-section label {
  position: absolute;
  bottom: 0px;
  left: 0%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid black;
}

.form-section label::after {
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

.content {
  position: absolute;
  bottom: 5px;
  left: 0px;
  transition: all 0.3s ease;
}

.form-section input:focus + .label .content,
.form-section input:valid + .label .content {
  transform: translateY(-150%);
  font-size: 14px;
  color: #dea90f;
}

.form-section input:focus + .label::after,
.form-section input:valid + .label::after {
  transform: translateX(0%);
}

button {
  cursor: pointer;
  border: none;
  color: #ffffff;
  border-radius: 80px;
  background: #293156;
  font-size: 1.5rem;
  padding: 10px 20px;
  transition: color 0.5s ease-in-out;
  margin: 3em;
}

button:hover {
  background: #ffffff;
  color: #dea90f;
}
</style>
