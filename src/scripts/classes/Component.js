import AutoBind from 'auto-bind'
import EventEmitter from 'events'

let element
let args

export default class extends EventEmitter {
    constructor (element, args) {
        super()

        AutoBind(this)

        this.element = element instanceof window.HTMLElement ? element : document.querySelector(element)

        if(args) {
            this.args = args
        }

        if(element) {
            this.init()
        }
    }

    init () {

    }

    addEventListeners () {

    }

    removeEventListeners () {

    }

    destroy () {
        this.removeEventListeners()
    }
}
