<template>
  <div>
    <fieldset class="kn-fieldset showcase showcase__buttons">
      <legend class="kn-fieldset__legend">Buttons</legend>
      <ol>
        <li><button type="button" class="kn-btn kn-primary">Primary</button></li>
        <li><button type="button" class="kn-btn kn-secondary">Secondary</button></li>
        <li><button type="button" class="kn-btn kn-neutral">Neutral</button></li>
        <li><button type="button" class="kn-btn kn-success">Success</button></li>
        <li><button type="button" class="kn-btn kn-warning">Warning</button></li>
        <li><button type="button" class="kn-btn kn-danger">Danger</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__buttons">
      <legend class="kn-fieldset__legend">Buttons - Ghosts</legend>
      <ol>
        <li><button type="button" class="kn-btn kn-ghost kn-primary">Primary</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-secondary">Secondary</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-neutral">Neutral</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-success">Success</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-warning">Warning</button></li>
        <li><button type="button" class="kn-btn kn-ghost kn-danger">Danger</button></li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__checkbox-group">
      <legend class="kn-fieldset__legend">Checkbox Group</legend>
      <ol>
        <li>
          <label class="kn-checkbox kn-primary">
            <input type="checkbox" name="checkboxes" value="primary" class="kn-checkbox__control" />
            <span class="kn-checkbox__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-checkbox kn-secondary">
            <input
              type="checkbox"
              name="checkboxes"
              value="secondary"
              class="kn-checkbox__control"
            />
            <span class="kn-checkbox__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-checkbox kn-neutral">
            <input type="checkbox" name="checkboxes" value="neutral" class="kn-checkbox__control" />
            <span class="kn-checkbox__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-checkbox kn-success">
            <input type="checkbox" name="checkboxes" value="success" class="kn-checkbox__control" />
            <span class="kn-checkbox__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-checkbox kn-warning">
            <input type="checkbox" name="checkboxes" value="warning" class="kn-checkbox__control" />
            <span class="kn-checkbox__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-checkbox kn-danger">
            <input type="checkbox" name="checkboxes" value="danger" class="kn-checkbox__control" />
            <span class="kn-checkbox__label">Danger</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kn-fieldset showcase showcase__radio-group">
      <legend class="kn-fieldset__legend">Radio Group</legend>
      <ol>
        <li>
          <label class="kn-radio kn-primary">
            <input type="radio" name="radios" value="primary" class="kn-radio__control" />
            <span class="kn-checkbox__label">Primary</span>
          </label>
        </li>
        <li>
          <label class="kn-radio kn-secondary">
            <input type="radio" name="radios" value="secondary" class="kn-radio__control" />
            <span class="kn-checkbox__label">Secondary</span>
          </label>
        </li>
        <li>
          <label class="kn-radio kn-neutral">
            <input type="radio" name="radios" value="neutral" class="kn-radio__control" />
            <span class="kn-checkbox__label">Neutral</span>
          </label>
        </li>
        <li>
          <label class="kn-radio kn-success">
            <input type="radio" name="radios" value="success" class="kn-radio__control" />
            <span class="kn-checkbox__label">Success</span>
          </label>
        </li>
        <li>
          <label class="kn-radio kn-warning">
            <input type="radio" name="radios" value="warning" class="kn-radio__control" />
            <span class="kn-checkbox__label">Warning</span>
          </label>
        </li>
        <li>
          <label class="kn-radio kn-danger">
            <input type="radio" name="radios" value="danger" class="kn-radio__control" />
            <span class="kn-checkbox__label">Danger</span>
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
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KitOfParts extends Vue {}
</script>
