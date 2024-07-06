<template>
  <nav>
    <router-link to="/">Home</router-link> |

    <router-link to="/checkout">
      <i class="fa-solid fa-cart-shopping absolute"></i>
    </router-link>
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
  import { CartService } from '@/services/cartService'

  const cartService = new CartService();

  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  background-color: lightseagreen !important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #83e4ff;
}

* {
  caret-color: transparent;
}
</style>
