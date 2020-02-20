<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<style>
  :root {
    --kn-danger: #E3788A;
    --kn-warning: #FCAC83;
    --kn-info: #E8E8E8;
    --kn-success: #34CCD1;
  }
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
