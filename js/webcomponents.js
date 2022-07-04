const template = document.createElement('template')
template.innerHTML = `
<input type="range" id="c-slider" min="1" max="5" value="1">
<style>
    #c-slider{
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 5px;
        width: 20%;
    }
</style>
`;

const template2 = document.createElement('template')
template2.innerHTML = `
<input type="number" id="c-num" value="1" placeholder="must be in range 1 - 5:">
<style>
    #c-num{
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 5px;
        width: 20%;
    }
</style>
`;

class customSlider extends HTMLElement {
    constructor(){
        super();

        this.attachShadow( {mode: "open"} )
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        
        this.inputChangeFunction = (event) => {
            const customEvent = new CustomEvent('update-amplitude', {
                bubbles: true,  // bubble event to containing elements
                composed: true, // let the event pass through the shadowDOM boundary
                detail: {value: event.target.value}
            })
            this.dispatchEvent(customEvent)
        }

        this.shadowRoot.querySelector("input").addEventListener("input", this.inputChangeFunction)
    }
}

class customNumber extends HTMLElement {
    constructor(){
        super();

        this.attachShadow( {mode: "open"} )
        this.shadowRoot.appendChild(template2.content.cloneNode(true))
        
        this.inputChangeFunction = (event) => {
            const customEvent = new CustomEvent('update-amplitude', {
                bubbles: true,  // bubble event to containing elements
                composed: true, // let the event pass through the shadowDOM boundary
                detail: {value: event.target.value}
            })
            this.dispatchEvent(customEvent)
        }

        this.shadowRoot.querySelector("input").addEventListener("input", this.inputChangeFunction)
    }
}

window.customElements.define('custom-number', customNumber);
window.customElements.define('custom-slider', customSlider);