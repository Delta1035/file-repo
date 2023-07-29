<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <h1>TodoList</h1>
  <router-view></router-view>

  <ul class="menu">
    <li class="status"></li>
    <li>
      <router-link to="/all">All</router-link>
    </li>
    <li>
      <router-link to="/active">Active</router-link>
    </li>
    <li>
      <router-link to="/completed">Completed</router-link>
    </li>
    <li>clear completed</li>
  </ul>
</template>

<style scoped>
h1{
    text-align: center  ;
}
.menu{
    width: 100%;
    text-align: center;
}
ul.menu>li{
    display: inline-block;
    margin: 0 10px;

}
ul.menu>li a{
    color: red;
    text-decoration: none;
}
</style>
