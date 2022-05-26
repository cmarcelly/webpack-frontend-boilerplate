import ParentObject from './components/test/ParentObject'

class App {
    constructor () {
        this.init()
    }

    init () {
        document.documentElement.classList.remove('no-js')

        console.log('NODE_ENV =>', process.env.NODE_ENV)
        console.log('SERVER_ENV =>', process.env.SERVER_ENV)

        const parentItem = new ParentObject(document.querySelector('[data-parent]'))
    }
}

const app = new App()
