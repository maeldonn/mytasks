<template>
  <section class="home">
    <Title content="Home" />
    <div class="panel">
      <div class="description">
        <h2>
          Welcome to
          <span class="title-first">My</span>
          <span>Tasks</span>
        </h2>
        <h3>A new place to manage your daily tasks... ✅</h3>
      </div>
      <hr />
      <div class="buttons">
        <router-link :to="{ name: 'Register' }"
          ><button>REGISTER</button></router-link
        >
        <router-link :to="{ name: 'Login' }"
          ><button>LOGIN</button></router-link
        >
      </div>
    </div>
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
  height: 85%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.panel {
  width: 80%;
  height: 80%;
  text-align: center;
}

.description {
  height: 50%;
}

h2 {
  font-size: 72px;
  margin: 1em auto;
}

span {
  letter-spacing: 5px;
  text-transform: uppercase;
}

.title-first {
  font-weight: 300;
}

h3 {
  margin: 2em;
  color: #797979;
}

.buttons {
  height: 45%;
  display: flex;
  justify-content: center;
}

a {
  outline: none;
}

button {
  width: 180px;
  cursor: pointer;
  border: none;
  color: #ffffff;
  border-radius: 80px;
  background: #293156;
  font-size: 1.5rem;
  padding: 20px 40px;
  transition: color 0.5s ease-in-out;
  margin: 3em;
}

button:hover {
  background: #ffffff;
  color: #dea90f;
}

@media screen and (max-width: 1000px) {
  h2 {
    margin: 0em auto;
  }
}

@media screen and (max-width: 600px) {
  h2 {
    margin: 0em auto;
  }

  .buttons {
    flex-direction: column;
    margin-top: 1em;
  }

  button {
    margin: 1em;
  }
}

@media screen and (max-width: 500px) {
  h2 {
    font-size: 50px;
  }

  h3 {
    font-size: 20px;
  }
}
</style>
