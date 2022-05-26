import Component from '../../classes/Component'

let timer

export default class extends Component {

    constructor (element, args) {
        super(element, args)
    }

    init () {
        this.timer = (this.args.index + 1) * 1000

        setTimeout(() => {
            this.emit('onTimeout', this)
        }, this.timer)
    }

    getColor() {
        return this.element.dataset.child
    }
}
