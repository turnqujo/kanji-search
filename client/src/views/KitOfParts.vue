<template>
  <div class="kop">
    <fieldset class="kn-fieldset kop__options">
      <legend class="kn-fieldset__legend">Options</legend>
      <ul class="kn-fieldset__content">
        <li>
          <button
            type="button"
            :class="['kn-btn', { 'kn-negative': !disableAll }, { 'kn-positive': disableAll }]"
            @click="disableAll = !disableAll"
          >
            {{ disableAll ? 'Enable' : 'Disable' }} Examples
          </button>
        </li>
      </ul>
    </fieldset>
    <fieldset class="kn-fieldset showcase--vertical">
      <legend class="kn-fieldset__legend">Typography</legend>
      <div class="kn-fieldset__content">
        <ol>
          <li><h1>Header One</h1></li>
          <li><h2>Header Two</h2></li>
          <li><h3>Header Three</h3></li>
          <li><h4>Header Four</h4></li>
        </ol>
        <ul>
          <li><p>Paragraph</p></li>
          <li><strong>Strong</strong></li>
          <li><em>Emphasis</em></li>
          <li><b>Bold</b></li>
          <li>
            <strong><em>Super strong emphasis</em></strong>
          </li>
          <li><code>code('example');</code></li>
          <li>
            <pre><code>function codeExample(arg) {
    return arg === 42
      ? 'Positive!'
      : 'Negative.'
  }</code></pre>
          </li>
          <li>
            <figure class="kn-figure">
              <figcaption class="kn-figure__caption">Caption Above</figcaption>
              <div class="kn-figure__content">
                <img src="img/icons/apple-touch-icon-60x60.png" />
              </div>
            </figure>
          </li>
          <li>
            <figure class="kn-figure kn-figure--reversed">
              <figcaption class="kn-figure__caption">Caption Below</figcaption>
              <div class="kn-figure__content">
                <img src="img/icons/apple-touch-icon-60x60.png" />
              </div>
            </figure>
          </li>
          <li>
            <figure class="kn-figure">
              <figcaption class="kn-figure__caption">Code Figure</figcaption>
              <div class="kn-figure__content">
                <pre><code>function codeExample(arg) {
    return arg === 42
      ? 'Positive!'
      : 'Negative.'
  }</code></pre>
              </div>
            </figure>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="kn-fieldset" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Buttons {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li><button type="button" class="kn-btn">Default</button></li>
        <li><button type="button" class="kn-btn kn-positive">Positive</button></li>
        <li><button type="button" class="kn-btn kn-negative">Negative</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Buttons - Ghost {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li><button type="button" class="kn-btn kn-ghost">Default</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-positive">Positive</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-negative">Negative</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Checkbox Group {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li>
          <label class="kn-selection-item">
            <input type="checkbox" name="checkboxes" value="default" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-positive">
            <input type="checkbox" name="checkboxes" value="positive" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Positive</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-negative">
            <input type="checkbox" name="checkboxes" value="negative" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Negative</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Radio Group {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li>
          <label class="kn-selection-item kn-radio">
            <input type="radio" name="radios" value="default" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-positive">
            <input type="radio" name="radios" value="positive" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Positive</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-negative">
            <input type="radio" name="radios" value="negative" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Negative</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase--vertical" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Text Input {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li>
          <label class="kn-input">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-positive">
            <input type="text" class="kn-input__control" placeholder="Positive" />
            <span class="kn-input__label">Positive</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-negative">
            <input type="text" class="kn-input__control" placeholder="Negative" />
            <span class="kn-input__label">Negative</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase--vertical" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Selects {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol class="kn-fieldset__content">
        <li>
          <label class="kn-select">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-positive">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Positive</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-negative">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Negative</span>
          </label>
        </li>
      </ol>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
  .kop__options > ul {
    align-items: center;
    justify-content: flex-start;

    & > li:not(:first-of-type) {
      margin-left: 1em;
    }
  }

  .kn-fieldset {
    margin-top: 24px;
  }

  .kn-fieldset ol,
  .kn-fieldset ul {
    display: flex;

    & > li:not(:first-of-type) {
      margin-left: 1em;
    }
  }

  .showcase--vertical ol,
  .showcase--vertical ul {
    align-items: flex-start;
    flex-direction: column;

    & > li:not(:first-of-type) {
      margin: 1em 0 0 0;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KitOfParts extends Vue {
    disableAll = false
  }
</script>
