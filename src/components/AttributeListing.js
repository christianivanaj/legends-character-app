/**
 * Attribute score/bonus/saves.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin-bottom: .75rem;
        white-space: nowrap;
    }
    :host([hidden]) {
        display: none
    }
    label {
        display: inline-block;
        margin-right: 1rem;
        width: auto;
        font-weight: bold;
    }
    label:first-of-type {
        width: 2rem;
    }
    input[type=number] {
        display: inline-block;
        margin-right: 1rem;
        width: 3rem;
        border: 1px dotted #bbb;
        border-radius: .4rem;
        padding: 0;
        font-size: 1rem;
    }
    input[type=checkbox] {
        width: auto;
        margin-right: 0.5rem;
        display: inline-block;
    }
    .pc-attribute-mod, .pc-save-mode {
        display: inline-block;
        margin-right: 1rem;
        font-weight: bold;
        min-width: 1.5rem;
        text-align: right;
    }
    button {
        background-color: var(--primary-color, black);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        margin: 0 0 -1rem 1rem;
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%);
        height: 1.25rem;
        width: 1.25rem;
    }
</style>
<label for="score"><slot></slot></label>
<input type="number" id="score" class="pc-attribute" value=10 min=3 max=25 />
<span class="pc-attribute-mod">0</span>
<label>
    <input type="checkbox" name="pc-save" value=1 />
    Save
</label>
<span class="pc-save-mod small">0</span>
<button type="button" data-die="1d20" aria-label="Saving throw"></button>
`;

class AttributeListing extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        // set any default attributes
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list-item');
        }

        this.scoreInput = this.shadowRoot.querySelector('input.pc-attribute');
        this.saveCheck = this.shadowRoot.querySelector('input[name="pc-save"]');

        // add event listeners
        this.saveCheck.addEventListener('change', this._checkSave.bind(this));
        this.scoreInput.addEventListener('change', this._scoreUpdate.bind(this));
        this.shadowRoot.querySelector('button').addEventListener('click', this._savingThrow.bind(this));
    }

    disconnectedCallback () {
        // remove event listeners
        this.saveCheck.removeEventListener('change', this._checkSave.bind(this));
        this.scoreInput.removeEventListener('change', this._scoreUpdate.bind(this));
        this.shadowRoot.querySelector('button').removeEventListener('click', this._savingThrow.bind(this));
    }
    /**
     * Name of the skill based on the data-name attribute.
     * @returns {String}
     */
    get attributeName () {
        return this.dataset.name || '';
    }
    /**
     * Set attribute name.
     * @param {String} val
     */
    set attributeName (val) {
        this.dataset.name = val;
    }
    /**
     * Get current attribute score.
     * @returns {Number}
     */
    get attributeScore () {
        return parseInt(this.scoreInput.value, 10);
    }
    /**
     * Set the attribute score.
     * @param {Number} val
     */
    set attributeScore (val) {
        this.scoreInput.value = val;
    }
    /**
     * Get if the save is proficient.
     * @returns {Number}
     */
    get saveProficiency () {
        return this.saveCheck.checked ? 1 : 0;
    }
    /**
     * Check (or not) the save proficiency.
     * @param {Number} val
     */
    set saveProficiency (val) {
        this.saveCheck.checked = (val);
    }
    /**
     * Set the attribute modifier.
     * @param {String} val
     */
    set attributeMod (val) {
        this.shadowRoot.querySelector('.pc-attribute-mod').innerHTML = val;
    }

    get saveMod () {
        return this.shadowRoot.querySelector('.pc-save-mod').innerHTML;
    }
    /**
     * Set the save modifier.
     * @param {String} mod
     */
    set saveMod (mod) {
        this.shadowRoot.querySelector('.pc-save-mod').innerHTML = mod;
    }
    /**
     * Handler: Change event on saves.
     * @param {Event} ev
     */
    _checkSave (ev) {
        const detail = {
            field: this.attributeName,
            value: ev.target.checked ? 1 : 0
        };
        this.dispatchEvent(new CustomEvent('saveChange', { bubbles: true, detail }));
    }
    /**
     * Handler: Change event on number input.
     * @param {Event} ev
     */
    _scoreUpdate (ev) {
        const detail = {
            field: this.attributeName,
            value: ev.target.value
        };
        this.dispatchEvent(new CustomEvent('attributeChange', { bubbles: true, detail }));
    }
    /**
     * Roll a saving throw.
     * @param {ClickEvent} ev
     */
    _savingThrow (ev) {
        const roller = document.querySelector('sheet-view-5e').shadowRoot.querySelector('dice-roller');
        if (!roller) {
            return;
        }
        const mod = this.saveMod;
        const die = `1d20${mod !== '0' ? mod : ''}`;
        roller.roll(die);
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('input').focus();
    }
}

window.customElements.define('attr-listing', AttributeListing);

export default AttributeListing;
