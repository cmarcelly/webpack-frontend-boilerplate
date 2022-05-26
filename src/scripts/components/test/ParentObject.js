import Component from '../../classes/Component'
import ChildObject from './ChildObject'

export default class extends Component {

    constructor (element) {
        super(element)
    }

    init() {
        Array.from(this.element.querySelectorAll('[data-child]')).forEach((item, index) => {
            let childItem = new ChildObject(item, {
                index: index
            })
            childItem.on('onTimeout', this.handleColor)
        })
    }

    handleColor(item) {
        this.element.style.backgroundColor = item.getColor()
    }
}
