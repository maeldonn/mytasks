<template>
  <section class="dashboard">
    <Title content="Dashboard" />
    <div class="spinner" v-if="isLoading">
      <img src="../assets/spinner.svg" />
    </div>
    <h1 v-if="!isLoading">Logged in as {{ user.email }} 🔐</h1>
    <form @submit.prevent="addTodo" v-if="!isLoading">
      <section class="form-section">
        <input
          v-model="newTodo"
          type="text"
          id="new-todo"
          autocomplete="off"
          required
        />
        <label for="new-todo" class="label">
          <span class="content">New Todo</span>
        </label>
      </section>
      <button type="submit">ADD</button>
    </form>
    <ul id="scroll-list" v-if="!isLoading">
      <li v-for="todo in todos" :key="todo._id" @click="deleteTodo(todo._id)">
        {{ todo.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

const axios = require('axios');

const API_URL = 'http://localhost:5000/';

export default {
  name: 'Dashboard',
  components: {
    Title,
  },
  data: () => ({
    isLoading: true,
    user: null,
    todos: [],
    newTodo: '',
  }),
  mounted() {
    axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((result) => {
        this.user = result.data.user;
        this.getTodos();
        setTimeout(() => {
          this.isLoading = false;
        }, 200);
      })
      .catch(() => {
        localStorage.removeItem('token');
        this.$router.push('/login');
      });
  },
  methods: {
    addTodo() {
      axios
        .post(
          `${API_URL}api/v1/todos`,
          {
            title: this.newTodo,
          },
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
        )
        .then((result) => {
          this.todos.push(result.data);
          this.newTodo = '';
          this.showForm = false;
        });
    },
    getTodos() {
      axios
        .get(`${API_URL}api/v1/todos`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((result) => {
          this.todos = result.data;
        });
    },
    deleteTodo(_id) {
      axios
        .delete(`${API_URL}api/v1/todos/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then(() => {
          this.getTodos();
        });
    },
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

button {
  cursor: pointer;
  border: none;
  color: #ffffff;
  border-radius: 80px;
  background: #293156;
  font-size: 1.5rem;
  padding: 10px 20px;
  transition: color 0.5s ease-in-out;
  margin: 0 1em;
}

button:hover {
  background: #ffffff;
  color: #dea90f;
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
  width: 50%;
  padding: 15px 20px;
  background-color: #293156;
  border: #dea90f 3px solid;
  border-radius: 20px;
  color: #ffffff;
  font-size: 1.3em;
  text-align: center;
}
</style>
