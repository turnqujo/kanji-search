<template>
  <div id="app" class="theme--default__colors  theme--default--dark">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/kit-of-parts">Kit of Parts</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import './vendor/reset.css';
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
  @import 'theme/mixins/shiftText.scss';
  @import 'theme/colors.scss';
  @import 'theme/sizes.scss';
  @import 'theme/typography.scss';
  @import 'theme/buttons.scss';
  @import 'theme/checkbox.scss';
  @import 'theme/inputs.scss';

  #app {
    background-color: var(--kn-background);
    box-sizing: border-box;
    color: var(--kn-foreground);
    font-size: 14px;
    min-height: 100vh;
    padding: 24px;
  }
</style>
