<template>
  <div>
    <ul class="showcase__options">
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
            <span class="kn-input__label ">Default</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-primary">
            <span class="kn-input__label ">Primary</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-secondary">
            <span class="kn-input__label ">Secondary</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-neutral">
            <span class="kn-input__label ">Neutral</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-success">
            <span class="kn-input__label ">Success</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-warning">
            <span class="kn-input__label ">Warning</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
          </label>
        </li>
        <li>
          <label class="kn-input kn-danger">
            <span class="kn-input__label ">Danger</span>
            <input type="text" class="kn-input__control" placeholder="Placeholder" />
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
    flex-direction: row;
    justify-content: space-evenly;
  }

  .showcase__options {
    text-align: end;
  }

  .showcase__input-text > ol {
    flex-direction: column;

    & > li {
      max-width: 250px;
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
