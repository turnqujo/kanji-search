<template>
  <div class="kn-kop">
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
    <div class="kn-kop__examples columns is-multiline">
      <fieldset class="kn-fieldset column is-full">
        <legend class="kn-fieldset__legend">Typography</legend>
        <div class="kn-fieldset__content">
          <ol class="columns is-multiline">
            <li class="column is-full"><h1>Header One</h1></li>
            <li class="column is-full"><h2>Header Two</h2></li>
            <li class="column is-full"><h3>Header Three</h3></li>
            <li class="column is-full"><h4>Header Four</h4></li>
          </ol>
          <ul class="columns is-multiline">
            <li class="column"><p>Paragraph</p></li>
            <li class="column"><strong>Strong</strong></li>
            <li class="column"><em>Emphasis</em></li>
            <li class="column"><b>Bold</b></li>
            <li class="column">
              <strong><em>Super strong emphasis</em></strong>
            </li>
            <li class="column"><code>code('example');</code></li>
          </ul>
          <ul class="columns">
            <li class="column is-narrow">
              <figure class="kn-figure">
                <figcaption class="kn-figure__caption">Caption Above</figcaption>
                <div class="kn-figure__content">
                  <img src="img/icons/apple-touch-icon-60x60.png" />
                </div>
              </figure>
            </li>
            <li class="column is-narrow">
              <figure class="kn-figure kn-figure--reversed">
                <figcaption class="kn-figure__caption">Caption Below</figcaption>
                <div class="kn-figure__content">
                  <img src="img/icons/apple-touch-icon-60x60.png" />
                </div>
              </figure>
            </li>
          </ul>
          <ul class="columns">
            <li class="column is-narrow">
              <pre><code v-html="codeExample"></code></pre>
            </li>
            <li class="column is-narrow">
              <figure class="kn-figure">
                <figcaption class="kn-figure__caption">Code Figure</figcaption>
                <div class="kn-figure__content">
                  <pre><code v-html="codeExample"></code></pre>
                </div>
              </figure>
            </li>
          </ul>
        </div>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Buttons</legend>
        <ol class="kn-fieldset__content columns">
          <li class="column is-narrow"><button type="button" class="kn-btn">Default</button></li>
          <li class="column is-narrow"><button type="button" class="kn-btn kn-positive">Positive</button></li>
          <li class="column is-narrow"><button type="button" class="kn-btn kn-negative">Negative</button></li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Buttons - Ghost</legend>
        <ol class="kn-fieldset__content columns">
          <li class="column is-narrow"><button type="button" class="kn-btn kn-ghost">Default</button></li>
          <li class="column is-narrow"><button type="button" class="kn-btn kn-ghost kn-positive">Positive</button></li>
          <li class="column is-narrow"><button type="button" class="kn-btn kn-ghost kn-negative">Negative</button></li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Checkbox Group</legend>
        <ol class="kn-fieldset__content columns is-multiline">
          <li class="column is-full">
            <label class="kn-selection-item">
              <input type="checkbox" name="checkboxes" value="default" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Default</span>
            </label>
          </li>
          <li class="column is-full">
            <label class="kn-selection-item kn-positive">
              <input type="checkbox" name="checkboxes" value="positive" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Positive</span>
            </label>
          </li>
          <li class="column is-full">
            <label class="kn-selection-item kn-negative">
              <input type="checkbox" name="checkboxes" value="negative" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Negative</span>
            </label>
          </li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Radio Group</legend>
        <ol class="kn-fieldset__content columns is-multiline">
          <li class="column is-full">
            <label class="kn-selection-item kn-radio">
              <input type="radio" name="radios" value="default" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Default</span>
            </label>
          </li>
          <li class="column is-full">
            <label class="kn-selection-item kn-radio kn-positive">
              <input type="radio" name="radios" value="positive" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Positive</span>
            </label>
          </li>
          <li class="column is-full">
            <label class="kn-selection-item kn-radio kn-negative">
              <input type="radio" name="radios" value="negative" class="kn-selection-item__control" />
              <span class="kn-selection-item__label">Negative</span>
            </label>
          </li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Text Input</legend>
        <ol class="kn-fieldset__content columns is-multiline">
          <li class="column is-full">
            <kn-text-input label="Default"></kn-text-input>
          </li>
          <li class="column is-full">
            <kn-text-input label="Positive" class="kn-positive"></kn-text-input>
          </li>
          <li class="column is-full">
            <kn-text-input label="Negative" class="kn-negative"></kn-text-input>
          </li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Selects</legend>
        <ol class="kn-fieldset__content columns is-multiline">
          <li class="column is-full">
            <kn-select-list label="Default" v-model="selectA">
              <option value="" disabled>Select an option</option>
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ selectA }}</p>
          </li>
          <li class="column is-full">
            <kn-select-list class="kn-positive" label="Positive" v-model="selectB">
              <option value="" disabled>Select an option</option>
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ selectB }}</p>
          </li>
          <li class="column is-full">
            <kn-select-list class="kn-negative" label="Negative" v-model="selectC">
              <option value="" disabled>Select an option</option>
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ selectC }}</p>
          </li>
          <li class="column is-full">
            <kn-select-list class="kn-negative" label="No model">
              <option value="" disabled>Select an option</option>
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
          </li>
          <li class="column is-full">
            <ul class="columns is-multiline is-mobile">
              <li class="column is-full">
                <kn-select-list class="kn-positive" label="Options Change" v-model="selectD">
                  <option v-for="option in selectDOptions" :key="option" :value="option">{{ option }}</option>
                </kn-select-list>
              </li>
              <li class="column is-full">
                <p>Selected: {{ selectD }}</p>
                <p>Options count: {{ selectDOptions.length }}</p>
              </li>
              <li class="column is-narrow">
                <button class="kn-btn kn-ghost kn-negative" type="button" @click="clearOptions">Clear</button>
              </li>
              <li class="column is-narrow">
                <button class="kn-btn kn-ghost kn-positive" type="button" @click="addOptions">Add Option</button>
              </li>
            </ul>
          </li>
        </ol>
      </fieldset>
      <fieldset class="kn-fieldset column" :disabled="disableAll">
        <legend class="kn-fieldset__legend">Multi-Selects</legend>
        <ol class="kn-fieldset__content columns is-multiline">
          <li class="column is-full">
            <kn-select-list label="Default" v-model="multiSelectA" multiple>
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ multiSelectA }}</p>
          </li>
          <li class="column is-full">
            <kn-select-list label="Positive" v-model="multiSelectB" multiple class="kn-positive">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ multiSelectB }}</p>
          </li>
          <li class="column is-full">
            <kn-select-list label="Negative" v-model="multiSelectC" multiple class="kn-negative">
              <option>Some Option</option>
              <option disabled>Disabled Option</option>
              <option>Other Option</option>
            </kn-select-list>
            <p>Selected: {{ multiSelectC }}</p>
          </li>
          <li class="column is-full">
            <ul class="columns is-multiline is-mobile">
              <li class="column is-full">
                <kn-select-list class="kn-positive" label="Options Change" v-model="multiSelectD" multiple>
                  <option v-for="option in multiSelectDOptions" :key="option" :value="option">{{ option }}</option>
                </kn-select-list>
              </li>
              <li class="column is-full">
                <p>Selected: {{ multiSelectD }}</p>
                <p>Options count: {{ multiSelectDOptions.length }}</p>
              </li>
              <li class="column is-narrow">
                <button class="kn-btn kn-ghost kn-negative" type="button" @click="clearOptionsToMulti">Clear</button>
              </li>
              <li class="column is-narrow">
                <button class="kn-btn kn-ghost kn-positive" type="button" @click="addOptionsToMulti">Add Option</button>
              </li>
            </ul>
          </li>
        </ol>
      </fieldset>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kn-kop {
    &__options {
      display: flex;
    }

    &__examples {
      margin-top: 2em;
      width: 100%;
    }

    .kn-fieldset.column {
      border: 1px solid var(--kn-background--aux);
      margin: 4px;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import KnSelectList from '../components/SelectList.vue'
  import KnTextInput from '../components/TextInput.vue'

  @Component({
    components: {
      KnSelectList,
      KnTextInput
    }
  })
  export default class KitOfParts extends Vue {
    disableAll = false
    selectA = ''
    selectB = ''
    selectC = ''
    selectD = ''
    selectDOptions: string[] = []

    multiSelectA = []
    multiSelectB = []
    multiSelectC = []
    multiSelectD = []
    multiSelectDOptions: string[] = []

    private readonly codeExample =
      "function codeExample(arg) {\n  return arg === 42\n    ? 'Positive!'\n    : 'Negative.'\n}"

    addOptions() {
      this.selectDOptions.push(`Option ${this.selectDOptions.length + 1}`)
    }

    clearOptions() {
      this.selectDOptions = []
    }

    addOptionsToMulti() {
      this.multiSelectDOptions.push(`Option ${this.multiSelectDOptions.length + 1}`)
    }

    clearOptionsToMulti() {
      this.multiSelectDOptions = []
    }
  }
</script>
