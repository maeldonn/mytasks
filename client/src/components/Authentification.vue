<template>
  <section class="authentification">
    <Title :content="type" />
    <div class="spinner" v-if="isLoading">
      <img src="../assets/spinner.svg" />
    </div>
    <div class="error" :class="errorMessage ? 'active' : null">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <form v-if="!isLoading" @submit.prevent="submit">
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
      <section v-if="type === 'Register'" class="form-section">
        <input
          v-model="user.confirmPassword"
          type="password"
          id="confirm-password"
          autocomplete="off"
          required
        />
        <label for="confirm-password" class="label">
          <span class="content">Password confirmation</span>
        </label>
      </section>
      <button type="submit">{{ type }}</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';
import axios from 'axios';

import Title from '@/components/Title.vue';

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).required(),
  confirmPassword: Joi.ref('password'),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).required(),
});

export default {
  name: 'Authentification',
  components: {
    Title,
  },
  props: {
    type: { type: String, required: true },
  },
  data: () => ({
    isLoading: false,
    errorMessage: '',
    user: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    submit: () => {},
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  mounted() {
    this.submit = this.type === 'Register' ? this.register : this.login;
  },
  methods: {
    register() {
      if (this.validUser()) {
        this.isLoading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}auth/register`,
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
          .catch((error) => {
            setTimeout(() => {
              this.isLoading = false;
              this.authentificationFailed(error.response.data.message);
            }, 1000);
          });
      }
    },
    login() {
      if (this.validUser()) {
        this.isLoading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}auth/login`,
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
              this.authentificationFailed();
            }, 1000);
          });
      }
    },
    validUser() {
      this.errorMessage = '';
      if (
        this.type === 'Register'
        && this.user.password !== this.user.confirmPassword
      ) {
        this.authentificationFailed('Passwords must match.');
        return false;
      }
      const value = this.type === 'Register'
        ? registerSchema.validate(this.user)
        : loginSchema.validate({
          email: this.user.email,
          password: this.user.password,
        });
      if (!value?.error) {
        return true;
      }
      if (this.type === 'Register') {
        if (value.error.message.includes('email')) {
          this.authentificationFailed(
            'Email address must be unique and valid.',
          );
        } else {
          this.authentificationFailed(
            'Your password must contain a minimum of 8 characters.',
          );
        }
      } else {
        this.isLoading = true;
        setTimeout(() => {
          this.authentificationFailed();
        }, 1000);
      }
      return false;
    },
    authentificationFailed(errorMessage = 'Connexion impossible.') {
      this.user.password = '';
      if (this.type === 'Register') {
        this.user.confirmPassword = '';
      }
      setTimeout(() => {
        this.errorMessage = errorMessage;
      }, 10);
      if (this.type === 'Login') {
        this.isLoading = false;
      }
      document.querySelector('#email').focus(); // TODO: Return null
    },
  },
};
</script>

<style scoped>
.authentification {
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
  text-transform: uppercase;
}

button:hover {
  background: #ffffff;
  color: #dea90f;
}
</style>
