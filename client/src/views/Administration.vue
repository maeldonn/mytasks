<template>
  <section class="administration">
    <Title content="Admin" />
    <div class="spinner" v-if="isLoading">
      <img src="../assets/spinner.svg" />
    </div>
    <form v-if="!isLoading">
      <section class="form-section">
        <input
          v-model="filter"
          type="text"
          id="user-filter"
          autocomplete="off"
          required
        />
        <label for="user-filter" class="label">
          <span class="content">Filter</span>
        </label>
      </section>
    </form>
    <ul id="scroll-list" v-if="!isLoading">
      <li v-for="user in filteredUsers" :key="user._id" @click="desactivateUser(user)">
        <p :class="!user.active ? 'unactive' : null">{{ user.email }}</p>
        <p class="unactive" v-if="!user.active">(Desactivated)</p>
      </li>
    </ul>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

const axios = require('axios');

export default {
  name: 'Administration',
  components: {
    Title,
  },
  data: () => ({
    isLoading: true,
    users: [],
    filteredUsers: [],
    filter: '',
  }),
  watch: {
    filter: {
      handler() {
        this.filterUsers(this.filter);
      },
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get(process.env.VUE_APP_API_URL, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((result) => {
          if (result.data.user.role !== 'admin') this.$router.push('/dashboard');
          else {
            axios
              .get(`${process.env.VUE_APP_API_URL}api/v1/users`, {
                headers: { Authorization: `Bearer ${localStorage.token}` },
              })
              .then((userList) => {
                this.users = userList.data.filter((user) => user.role === 'user');
                this.filterUsers(this.filter);
                setTimeout(() => {
                  this.isLoading = false;
                }, 200);
              })
              .catch(() => {
                this.$router.push('/dashboard');
              });
          }
        })
        .catch((error) => {
          this.unauthorized(error);
        });
    },
    desactivateUser(user) {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}api/v1/users/${user._id}`,
          {
            active: !user.active,
          },
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
        )
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          this.unauthorized(error);
        });
    },
    filterUsers(filter) {
      this.filteredUsers = this.users.filter((user) => user.email.includes(filter));
    },
    unauthorized(error) {
      if (error.response.status === 401) {
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>

<style scoped>
.administration {
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

form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3em;
}

.form-section {
  position: relative;
  height: 50px;
  overflow: hidden;
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

ul {
  width: 100%;
  list-style: none;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  margin: 0.5em 1em;
  cursor: pointer;
  width: 70%;
  padding: 15px 20px;
  background-color: #293156;
  border: #dea90f 3px solid;
  border-radius: 20px;
  color: #ffffff;
  font-size: 1.3em;
  text-align: center;
  /* TODO: OVERFLOW FOR EMAIL TOO LONG */
}

.unactive {
  color: #7a7a7a;;
}

@media screen and (max-width: 800px) {
  form {
    margin: 1em;
  }
}
</style>
