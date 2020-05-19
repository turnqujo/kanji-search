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
  @import 'theme/buttons.scss';
  @import 'theme/checkbox.scss';

  .input-label {
    text-align: left;
  }

  .input-label-text {
    display: block;
    margin-bottom: 4px;
    margin-left: 4px;
  }

  #app {
    background-color: var(--kn-background);
    color: var(--kn-foreground);
    padding: 24px;
    min-height: 100vh;
    box-sizing: border-box;
  }

  input {
    border: 2px solid var(--kn-neutral);
    border-radius: 4px;
    background-color: var(--kn-background);
    color: var(--kn-foreground);

    &:active,
    &:focus {
      border-color: var(--kn-primary);
    }
  }

  .kn-fieldset {
    border: 2px solid var(--kn-neutral-dark);
    border-radius: 4px;
    padding: 8px 12px;

    &__legend {
      color: var(--kn-foreground);
      padding: 0 8px;
    }
  }
</style>
