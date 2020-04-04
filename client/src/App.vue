<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
  @import './vendor/reset.css';
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

  .input-label {
    text-align: left;
  }

  .input-label-text {
    display: block;
    margin-bottom: 4px;
    margin-left: 4px;
  }
</style>
