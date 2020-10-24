<template>
  <nav>
    <div class="logo">
      <router-link :to="{ name: 'Home' }">
        <h4>
          <span class="title-first">My</span>
          <span>Tasks</span>
        </h4>
      </router-link>
    </div>
    <ul class="nav-links" v-if="connected">
      <li @click="closeMenu">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </li>
      <li v-if="isAdmin" @click="closeMenu">
        <router-link :to="{ name: 'Administration' }">Admin</router-link>
      </li>
      <li @click="closeMenu">
        <router-link :to="{ name: 'Home' }">Disconnect</router-link>
      </li>
    </ul>
    <ul class="nav-links" v-else>
      <li @click="closeMenu">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li @click="closeMenu">
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </li>
      <li @click="closeMenu">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </li>
    </ul>
    <div class="burger" @click="navSlide">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    connected: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  methods: {
    navSlide() {
      document.querySelector('.nav-links').classList.toggle('nav-active');
      document.querySelectorAll('.nav-links li').forEach((link, index) => {
        if (link.style.animation) {
          // eslint-disable-next-line no-param-reassign
          link.style.animation = '';
        } else {
          // eslint-disable-next-line no-param-reassign
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      document.querySelector('.burger').classList.toggle('toggle');
    },
    closeMenu() {
      if (document.querySelector('.nav-active')) this.navSlide();
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: #293156;
}

.logo h4 {
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 28px;
}

.title-first {
  font-weight: 300;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  width: 30%;
}

li {
  list-style: none;
  font-size: 18px;
  padding: 0 20px;
}

a {
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 3px;
  font-weight: bold;
  transition: all 0.1s ease-in;
}

a:hover {
  color: #dea90f;
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 800px) {
  .nav-links {
    position: absolute;
    right: 0px;
    height: 92vh;
    top: 8vh;
    background-color: #293156;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
    border: #dea90f 3px solid;
    z-index: 100000;
  }

  li {
    font-size: 50px;
    margin: 30px auto;
  }

  a:hover {
    border-bottom: 2px solid #dea90f;
  }

  .burger {
    display: block;
  }
}

.nav-active {
  transform: translateX(0%);
}

@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.toggle .line2 {
  opacity: 0;
}

.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
</style>
