import ParentObject from './components/test/ParentObject'

class App {
    constructor () {
        this.init()
    }

    init () {
        document.documentElement.classList.remove('no-js');

        const parentItem = new ParentObject(document.querySelector('[data-parent]'))
    }
}

const app = new App()
