import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { PaperChip } from './paper-chip.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import '@polymer/paper-input/paper-input-char-counter.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-styles/default-theme.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
class PaperChipInput extends
    mixinBehaviors(IronA11yKeysBehavior,
        mixinBehaviors(PaperInputBehavior, PolymerElement)) {
  static get template() {
    return html`
        <style>
            :host {
                display: block;

                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;

                --paper-input-container-input: {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    box-sizing: border-box;
                    cursor: pointer;
                };

                @apply --paper-dropdown-menu;
                width: 100%;
            }

            :host([focused]) {
                outline: none;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([noline]) {
                --paper-input-container-underline: {
                    display: none;
                };
                --paper-input-container-underline-focus: {
                    display: none;
                };
                --paper-input-container-underline-disabled: {
                    display: none;
                };
            }

            :host([no-label-float]) #label {
                top: 22px;
            }

            div[container] {
                @apply --layout;
                @apply --layout-wrap;
            }

            iron-input {
                @apply --layout-flex-auto;
                max-width: 100%;
            }

            input {
                position: relative; /* to make a stacking context */
                outline: none;
                box-shadow: none;
                padding: 0;
                width: 100%;
                max-width: 100%;
                background: transparent;
                border: none;
                color: var(--paper-input-container-input-color, var(--primary-text-color));
                -webkit-appearance: none;
                text-align: inherit;
                vertical-align: bottom;

                /* Firefox sets a min-width on the input, which can cause layout issues */
                min-width: 0;

                @apply --paper-font-subhead;
                @apply --paper-input-container-input;

                line-height: 32px;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                @apply --paper-input-container-input-webkit-spinner;
            }

            input::-webkit-clear-button {
                @apply --paper-input-container-input-webkit-clear;
            }

            input::-webkit-input-placeholder {
                color: var(--paper-input-container-color, var(--secondary-text-color));
            }

            input:-moz-placeholder {
                color: var(--paper-input-container-color, var(--secondary-text-color));
            }

            input::-moz-placeholder {
                color: var(--paper-input-container-color, var(--secondary-text-color));
            }

            input::-ms-clear {
                @apply --paper-input-container-ms-clear;
            }

            input:-ms-input-placeholder {
                color: var(--paper-input-container-color, var(--secondary-text-color));
            }

            label {
                pointer-events: none;
                line-height: 32px;
            }

            paper-input-container {
                @apply --layout-wrap;
            }

            paper-ripple {
                top: 12px;
                left: 0;
                bottom: 8px;
                right: 0;

                @apply --paper-dropdown-menu-ripple;
            }

            paper-material {
                position: absolute;
                display: block;
                max-height: var(--paper-chip-input-autocomplete-height, 300px);
                overflow-y: auto;
                background: var(--paper-chip-input-autocomplete-background, white);
                z-index: 1;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 100%;
                box-sizing: border-box;
                cursor: pointer;
            }

            paper-item.iron-selected {
                font-weight: inherit;
            }

            paper-chip {
                margin: 0 4px 4px 0;
            }

            [hidden] {
                display: none;
            }
        </style>


        <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder,values.length)]]" auto-validate\$="[[autoValidate]]" disabled\$="[[disabled]]" invalid="[[invalid]]">

            <slot name="prefix" slot="prefix"></slot>

            <label hidden\$="[[_computeLabelVisibility(noLabelFloat,label,values.length)]]" aria-hidden="true" for="input" slot="label">[[label]]</label>

            <div container="" slot="input">
                <dom-repeat items="[[values]]" as="value">
                    <template>
                        <paper-chip value="[[value]]" on-remove="_removeChip" removable="" single-line="">
                            <template is="dom-if" if="[[_lookupHasIcon(value)]]">
                                <iron-icon icon="[[_lookupIcon(value)]]" src="[[_lookupIconSrc(value)]]" slot="icon"></iron-icon>
                            </template>
                            <span slot="label" class="label">[[_lookupLabel(value)]]</span>
                        </paper-chip>
                    </template>
                </dom-repeat>
                <iron-input bind-value="{{stagedValue}}" id="input" maxlength\$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">
                    <input id="nativeInput" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" disabled\$="[[disabled]]" title\$="[[title]]" type\$="[[type]]" pattern\$="[[pattern]]" required\$="[[required]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]" min\$="[[min]]" max\$="[[max]]" step\$="[[step]]" name\$="[[name]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" list\$="[[list]]" size\$="[[size]]" autocapitalize\$="[[autocapitalize]]" autocorrect\$="[[autocorrect]]" on-change="_onChange" tabindex\$="[[tabIndex]]" autosave\$="[[autosave]]" results\$="[[results]]" accept\$="[[accept]]" multiple\$="[[multiple]]">
                </iron-input>
            </div>

            <slot name="suffix" slot="suffix"></slot>

            <template is="dom-if" if="[[errorMessage]]">
                <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
            </template>

            <template is="dom-if" if="[[charCounter]]">
                <paper-input-char-counter slot="add-on"></paper-input-char-counter>
            </template>

        </paper-input-container>

        <template is="dom-if" if="[[autocomplete]]">
                <paper-material id="tips" elevation="1" hidden\$="[[hidden]]">
                    <paper-listbox tabindex="0" id="list">
                        <dom-repeat items="[[_source]]">
                            <template>
                                <paper-icon-item tabindex="0" value="[[_computeValue(item)]]" label-text="[[_computeLabel(item)]]" icon="[[_computeIcon(item)]]" icon-src="[[_computeIconSrc(item)]]" on-tap="_select">
                                     <template is="dom-if" if="[[_hasIcon(item)]]">
                                         <iron-icon icon="[[_computeIcon(item)]]" src="[[_computeIconSrc(item)]]" slot="item-icon"></iron-icon>
                                     </template>
                                     [[_computeLabel(item)]]
                                     <paper-ripple></paper-ripple>
                                </paper-icon-item>
                            </template>
                        </dom-repeat>
                    </paper-listbox>
                </paper-material>
        </template>
`;
  }

  static get is() {
      return "paper-chip-input"
  }

  static get properties() {
      return {
          stagedValue: {
              type: String,
              notify: true
          },
          displayProperty: {
              type: String,
              value: "label"
          },
          valueProperty: {
              type: String,
              value: "value"
          },
          iconProperty: {
              type: String,
              value: "icon"
          },
          iconSrcProperty: {
              type: String,
              value: "iconSrc"
          },
          hidden: {
              type: Boolean,
              value: true
          },
          label: {
              type: String,
              value: "Tags"
          },
          values: {
              type: Array,
              notify: true,
              value: () => []
          },
          datasource: {
              type: Array,
              value: () => []
          },
          _source: {
              type: Array,
              value: () => []
          },
          _hasValues: {
              type: Boolean
          },
          _hasContent: {
              type: Boolean
          },
          autocomplete: {
              type: Boolean
          },
          enterKeys: {
              type: Array,
              value: () => ["enter"]
          },
          filter: {
              type: Function,
              value: function () {
                  return (data, value) =>
                      data.filter(
                          (item) => this._computeLabel(item).toLowerCase().startsWith(value.toLowerCase())
                      )
              }
          }
      }
  }

  static get observers() {
      return [
          "_onValuesChanged(values, values.splices)"
      ];
  }

  get keyBindings() {
      return {
          "backspace": "_remove",
          "esc": "_hideTips"
      }
  }

  _grabChips() {
      const children = this.getEffectiveChildren()
      if (children.length > 0) {
          for (const index in children) {
              const el = children[index]
              if (el instanceof PaperChip && el.value !== undefined) {
                  const item = {
                      [this.displayProperty]: el.label,
                      [this.valueProperty]: el.value,
                      [this.iconProperty]: el.icon,
                      [this.iconSrcProperty]: el.iconSrc
                  }

                  this.push("datasource", item)
                  this._pushChipByValue(el.value)
                  el.parentElement.removeChild(el)
              }
          }
      }
  }

  _onIronInputReady() {
      if (this.inputElement &&
          this._typesThatHaveText.indexOf(this.inputElement.inputElement.type) !== -1) {
          this.alwaysFloatLabel = true
      }
      // Only validate when attached if the input already has a value.
      if (!!this.inputElement.bindValue) {
          this.$.container._handleValueAndAutoValidate(this.inputElement);
      }
  }

  _onFocusout() {
      if (this.autocomplete && !this.hidden) {
          this._hideTips()
      }
  }

  _computeLabelVisibility(noLabelFloat, label, len) {
      return !label || (noLabelFloat && len > 0)
  }

  _computeAlwaysFloatLabel(alwaysFloatLabel, placeholder, len) {
      return placeholder || alwaysFloatLabel || len > 0
  }

  _computeHasContent(hasValues) {
      this._hasContent = this._hasValues
  }

  _add() {
      if (!this.validate())
          return
      if (!this.autocomplete) {
          this._pushChip()
      }
  }

  _remove(evt) {
      // path is the array of nodes through which event will pass...
      //
      // this check avoids to run _remove when press backspace key when a chip is focused.
      // In that case the event _removeChip has to take place
      if (this.$.nativeInput === evt.detail.keyboardEvent.composedPath()[0]) {
          if (this.inputElement.value === "" && this.values.length > 0) {
              var index = this.values.length
              var value = this.values[index - 1]
              this._popChip()
              this.dispatchEvent(new CustomEvent("chip-removed", { detail: { index: index - 1, value: value } }))
          }
      }
  }

  connectedCallback() {
      super.connectedCallback()

      this._boundOnIronInputReady = this._onIronInputReady.bind(this)

      this._boundOnFocusout = this._onFocusout.bind(this)

      const input = this.inputElement

      input.addEventListener("iron-input-ready", this._boundOnIronInputReady)

      input.addEventListener("input", (event) => {
          this._hasContent = (this._hasValues || input.value || input.value === 0) ? true : false
      })

      input.addEventListener("keydown", (event) => {
          if (input.value === "" && event.keyCode === 32) {
              event.preventDefault()
          }
      })

      input.addEventListener("keyup", (event) => {
          this._hasContent = (this._hasValues || input.value) ? true : false

          if (this.autocomplete && this._hasContent) {
              if (input.value !== "" && event.keyCode !== 27) {
                  this._filter()
              }
          }
          if (!this._hasContent) {
              this._hideTips()
          }
      })

      this.addEventListener("focusout", this._boundOnFocusout)

      // Difference between the user enter keys and the reserved ones
      const rsrv = new Set(["backspace", "delete", "escape"])
      const diff = new Set(this.enterKeys.filter(val => !rsrv.has(val.toLowerCase())))

      // Imperatively insert keys to the key bindings property
      diff.forEach((key) => this.addOwnKeyBinding(key, "_add"))


      new FlattenedNodesObserver(this, this._grabChips)
  }

  disconnectedCallback() {
      super.disconnectedCallback()

      const input = this.inputElement

      input.removeEventListener("iron-input-ready", this._boundOnIronInputReady)

      this.removeEventListener("focusout", this._boundOnFocusout)
  }

  _onValuesChanged(values) {
      if (!values) {
          this._hasValues = this._hasContent = false
          return
      }
      this._ensurePlaceholder()
      const uniqueValues = [...new Set(values)]
      if (values.length !== uniqueValues.length) {
          this.values = uniqueValues
      }
      this._hasValues = this._hasContent = this.values.length > 0
  }

  _ensureValues() {
      if (!this.values) {
          this.values = []
      }
  }

  _ensurePlaceholder() {
      if (this.values.length > 0) {
          this._removePlaceholder()
      } else {
          this._addPlaceholder()
      }
  }

  _popChip() {
      if (this.autocomplete) {
          this._hideTips()
          this.pop("values")
          this._prefilterSource()
      } else {
          this._ensureValues()
          this.pop("values")
          this._ensurePlaceholder()
      }
  }

  _pushChip() {
      const input = this.inputElement
      if (input.value) {
          this._pushChipByValue(input.value)
          input.bindValue = ""
      }
  }

  _pushChipByValue(value) {
      value = value.trim()
      this._ensureValues()
      if (this.values.indexOf(value) < 0 && value !== "") {
          this.push("values", value)
          this._ensurePlaceholder()
          this.dispatchEvent(new CustomEvent("chip-added"))
      }
  }

  _removePlaceholder() {
      this.inputElement.removeAttribute("placeholder")
  }

  _addPlaceholder() {
      if (this.placeholder) this.inputElement.setAttribute("placeholder", this.placeholder)
  }

  _filter() {
      const input = this.inputElement
      if (input.value) {
          this._prefilterSource()
          this._source = this.filter(this._source, input.value)
          if (!this._source.length) {
              this._hideTips()
          } else {
              this.hidden = false
          }
      }
  }

  _select(event) {
      const input = this.inputElement
      this.push("values", event.target.value)
      input.bindValue = ""
      this._hideTips()

      this.$.input.focus()
      this.dispatchEvent(new CustomEvent("chip-added"))
  }

  _removeChip(evt) {
      // Prevent the paper-chip detaches itself from dom-repeat
      evt.preventDefault()

      this._ensureValues()

      // Possible since no chips with the same content are admitted
      const index = this.values.indexOf(evt.model.value)
      const value = evt.model.value

      if (this.autocomplete) {
          this._hideTips()
          if (index in this.values) {
              this.splice("values", index, 1)
              this._prefilterSource()
          }
      } else {
          if (index in this.values) {
              this.splice("values", index, 1)
              this._ensurePlaceholder()
          }
      }
      this.dispatchEvent(new CustomEvent("chip-removed", { detail: { index: index, value: value } }))
  }

  _filterSource(selectedValue) {
      console.log(selectedValue)
      const index = this._source.findIndex((item) => {
          return this._computeValue(item) === selectedValue
      })

      if (index !== -1) {
          this.splice("_source", index, 1)
      }
  }

  _prefilterSource() {
      this._source = this.datasource.slice()

      this.values.forEach((item) => {
          this._filterSource(item)
      })
  }

  _includes(value) {
      return this._source.filter((item) => {
          return this._computeLabel(item).toLowerCase().includes(value.toLowerCase())
      })
  }

  _startsWith(value) {
      return this._source.filter((item) => {
          return this._computeLabel(item).toLowerCase().startsWith(value.toLowerCase())
      })
  }

  _lookupItem(value) {
      return this.datasource.find((item) => {
          return this._computeValue(item) === value
      })
  }

  _computeValue(item) {
      return item[this.valueProperty] !== undefined ? item[this.valueProperty] : item
  }

  _computeLabel(item) {
      return item[this.displayProperty] ? item[this.displayProperty] : item
  }

  _lookupLabel(value) {
      const item = this._lookupItem(value)

      if (item !== undefined) {
          return this._computeLabel(item)
      }

      return value
  }

  _computeIcon(item) {
      return item[this.iconProperty] ? item[this.iconProperty] : ""
  }

  _computeIconSrc(item) {
      return item[this.iconSrcProperty] ? item[this.iconSrcProperty] : ""
  }

  _lookupIcon(value) {
      const item = this._lookupItem(value)

      if (item !== undefined) {
          return this._computeIcon(item)
      }

      return ""
  }

  _lookupIconSrc(value) {
      const item = this._lookupItem(value)

      if (item !== undefined) {
          return this._computeIconSrc(item)
      }

      return ""
  }

  _hasIcon(item) {
      return Boolean(this._computeIcon(item) || this._computeIconSrc(item))
  }

  _lookupHasIcon(value) {
      const item = this._lookupItem(value)

      if (item !== undefined) {
          return this._hasIcon(item)
      }

      return false
  }

  _hideTips() {
      if (this.autocomplete) {
          this.shadowRoot.querySelector("#tips") ? this.shadowRoot.querySelector("#tips").scrollTop = 0 : ""
          this.hidden = true
      }
  }

  /**
   * Returns a reference to the focusable element. Overridden from PaperInputBehavior
   * to correctly focus the native input.
   */
  get _focusableElement() {
      return this.inputElement.inputElement
  }
}

customElements.define(PaperChipInput.is, PaperChipInput)
