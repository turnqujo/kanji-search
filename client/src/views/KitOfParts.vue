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
  </div>
</template>

<style lang="scss">
  .showcase {
    margin-top: 24px;
  }

  .showcase > ol {
    display: flex;
    flex-direction: row;
  }

  .showcase > ol > li:not(:first-of-type) {
    margin-left: 24px;
  }

  .showcase__options {
    text-align: end;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KitOfParts extends Vue {
    disableAll = false
  }
</script>
