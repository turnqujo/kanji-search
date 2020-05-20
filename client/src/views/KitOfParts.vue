<template>
  <div :class="sizeAll">
    <ul class="showcase__options">
      <li>
        <select v-model="sizeAll">
          <option value="kn-xsmall">Extra Small</option>
          <option value="kn-small">Small</option>
          <option value="kn-medium">Medium</option>
          <option value="kn-large">Large</option>
          <option value="kn-xlarge">Extra Large</option>
        </select>
      </li>
      <li>
        <button
          type="button"
          :class="['kn-btn', { 'kn-danger': !disableAll }, { 'kn-primary': disableAll }]"
          @click="disableAll = !disableAll"
        >
          {{ disableAll ? 'Enable' : 'Disable' }} Examples
        </button>
      </li>
    </ul>
    <fieldset class="kn-fieldset showcase showcase__typography" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Typography</legend>
      <ol>
        <li><h1>Header One</h1></li>
        <li><h2>Header Two</h2></li>
        <li><h3>Header Three</h3></li>
        <li><h4>Header Four</h4></li>
        <li><h5>Header Five</h5></li>
        <li><h6>Header Six</h6></li>
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
          Above the rule
          <hr />
          Below the rule
        </li>
        <li>
          <figure>
            <img src="img/icons/apple-touch-icon-60x60.png" />
            <figcaption>Caption Below</figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <figcaption>Caption Above</figcaption>
            <img src="img/icons/apple-touch-icon-60x60.png" />
          </figure>
        </li>
        <li>
          <figure>
            <figcaption><b>Code Figure</b></figcaption>
            <pre><code>function codeExample(arg) {
  return arg === 42
    ? 'Positive!'
    : 'Negative.'
}</code></pre>
          </figure>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__buttons" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Buttons {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li><button type="button" class="kn-btn">Default</button></li>
        <li><button type="button" class="kn-btn kn-primary">Primary</button></li>
        <li><button type="button" class="kn-btn kn-secondary">Secondary</button></li>
        <li><button type="button" class="kn-btn kn-neutral">Neutral</button></li>
        <li><button type="button" class="kn-btn kn-success">Success</button></li>
        <li><button type="button" class="kn-btn kn-warning">Warning</button></li>
        <li><button type="button" class="kn-btn kn-danger">Danger</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__buttons" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Buttons - Ghosts {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li><button type="button" class="kn-btn kn-ghost">Default</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-primary">Primary</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-secondary">Secondary</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-neutral">Neutral</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-success">Success</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-warning">Warning</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-danger">Danger</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__checkbox-group" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Checkbox Group {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li>
          <label class="kn-selection-item">
            <input type="checkbox" name="checkboxes" value="default" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-primary">
            <input type="checkbox" name="checkboxes" value="primary" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-secondary">
            <input type="checkbox" name="checkboxes" value="secondary" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-neutral">
            <input type="checkbox" name="checkboxes" value="neutral" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-success">
            <input type="checkbox" name="checkboxes" value="success" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-warning">
            <input type="checkbox" name="checkboxes" value="warning" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-danger">
            <input type="checkbox" name="checkboxes" value="danger" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Danger</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__radio-group" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Radio Group {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li>
          <label class="kn-selection-item kn-radio">
            <input type="radio" name="radios" value="default" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-primary">
            <input type="radio" name="radios" value="primary" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-secondary">
            <input type="radio" name="radios" value="secondary" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-neutral">
            <input type="radio" name="radios" value="neutral" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-success">
            <input type="radio" name="radios" value="success" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-warning">
            <input type="radio" name="radios" value="warning" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item kn-radio kn-danger">
            <input type="radio" name="radios" value="danger" class="kn-selection-item__control" />
            <span class="kn-selection-item__label">Danger</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__input-text" :disabled="disableAll">
      <legend class="kn-fieldset__legend">Input - Text {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li>
          <label class="kn-input">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-primary">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-secondary">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-neutral">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-success">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-warning">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-danger">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label ">Danger</span>
          </label>
        </li>
      </ol>
    </fieldset>
  </div>
</template>

<style lang="scss">
  .showcase {
    margin-top: 24px;
  }

  .showcase > ol {
    display: flex;
    justify-content: space-evenly;
  }

  .showcase__options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .showcase__options > li:not(:first-of-type) {
    margin-left: 12px;
  }

  .showcase__typography > ol {
    flex-direction: column;

    & > li:not(:first-of-type) {
      margin-top: 12px;
    }
  }

  .showcase__input-text > ol {
    flex-direction: column;
    align-items: flex-start;

    & > li:not(:first-of-type) {
      margin-top: 12px;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type fontSizes = 'kn-xsmall' | 'kn-small' | 'kn-medium' | 'kn-large' | 'kn-xlarge'

  @Component({})
  export default class KitOfParts extends Vue {
    sizeAll: fontSizes = 'kn-medium'
    disableAll = false
  }
</script>
