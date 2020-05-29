<template>
  <div>
    <fieldset class="showcase showcase__options">
      <legend>Options</legend>
      <ul>
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
    </fieldset>
    <fieldset class="showcase showcase__typography showcase--vertical" :disabled="disableAll">
      <legend>Typography</legend>
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
      </ul>
    </fieldset>
    <fieldset class="showcase showcase__buttons" :disabled="disableAll">
      <legend>Buttons {{ disableAll ? '(Disabled)' : '' }}</legend>
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
    <fieldset class="showcase showcase__buttons" :disabled="disableAll">
      <legend>Buttons - Ghosts {{ disableAll ? '(Disabled)' : '' }}</legend>
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
    <fieldset class="showcase showcase__checkbox-group" :disabled="disableAll">
      <legend>Checkbox Group {{ disableAll ? '(Disabled)' : '' }}</legend>
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
    <fieldset class="showcase showcase__radio-group" :disabled="disableAll">
      <legend>Radio Group {{ disableAll ? '(Disabled)' : '' }}</legend>
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
    <fieldset class="showcase showcase__input-text showcase--vertical" :disabled="disableAll">
      <legend>Input - Text {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
        <li>
          <label class="kn-input">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Default</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-primary">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-secondary">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-neutral">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-success">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-warning">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-input kn-danger">
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
            <span class="kn-input__label">Danger</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="showcase showcase__select showcase--vertical" :disabled="disableAll">
      <legend>Selects {{ disableAll ? '(Disabled)' : '' }}</legend>
      <ol>
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
          <label class="kn-select kn-primary">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-secondary">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-neutral">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-success">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-warning">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-select kn-danger">
            <select class="kn-select__control">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </select>
            <span class="kn-select__label">Danger</span>
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

  .showcase__options {
    transition: background-color 140ms ease-in-out;
    background-color: var(--kn-background);
    position: sticky;
    top: 0;
  }

  .showcase__options > ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > li:not(:first-of-type) {
      margin-left: 12px;
    }
  }

  .showcase > ol {
    display: flex;
    justify-content: space-between;
  }

  .showcase--vertical > ol,
  .showcase--vertical > ul {
    align-items: flex-start;
    flex-direction: column;

    & > li:not(:first-of-type) {
      margin-top: 12px;
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
