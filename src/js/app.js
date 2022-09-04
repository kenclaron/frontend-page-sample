import InputLabel from './components/InputLabel'
import CloseFeature from './components/CloseFeature'
import ChangePlan from './components/ChangePlan'
import ChangeTile from './components/ChangeTile'
import ChangeContent from './components/ChangeContent'
import InitProgressBar from './components/InitProgressBar'

class App {
    scrollToOffset = 100
    popupLoadedEvent = 'app.popup_loaded'

    constructor(config) {
        if (typeof config === 'object') {
            Object.keys(config).forEach((key) => {
                this[key] = config[key]
            })
        }
        this.body = document.querySelector('body')

        this.initScrollTo()

        new InputLabel
        new CloseFeature
        new ChangePlan
        new ChangeTile
        new ChangeContent
        new InitProgressBar

        this.body.classList.add('_init')
    }

    initInputLabel(wrapper = document) {
        const selector = '.js-label input, .js-label textarea'
        const className = '_label-empty'
        const items = wrapper.querySelectorAll(selector)
        document.addEventListener(
            'focus',
            (e) => {
                console.log(e.target)
                const parent = e.target.parentNode
                if (parent.classList.contains('js-label')) {
                    const label = Array.prototype.find.call(
                        parent.children,
                        (child) => child.tagName === 'LABEL'
                    )
                    label.classList.remove(className)
                }
            },
            true
        )
        document.addEventListener(
            'blur',
            (e) => {
                console.log(e.target)
                if (!e.target.value) {
                    const parent = e.target.parentNode
                    if (parent.classList.contains('js-label')) {
                        const label = Array.prototype.find.call(
                            parent.children,
                            (child) => child.tagName === 'LABEL'
                        )
                        label.classList.add(className)
                    }
                }
            },
            true
        )
        // this.app.document
        //     .on('focus', sel, function () {
        //         $(this).siblings('label').removeClass(className);
        //     })
        //     .on('blur', sel, function () {
        //         if (!$(this).val()) {
        //             $(this).siblings('label').addClass(className);
        //         }
        //     });
        items.forEach((el) => {
            const label = Array.prototype.find.call(
                el.parentNode.children,
                (child) => child.tagName === 'LABEL'
            )
            if (!el.value) {
                label.classList.add(className)
            }
        })
    }

    initScrollTo() {
        document.querySelectorAll('.js-scrollto[data-target]').forEach((el) => {
            let target = document.querySelector(el.dataset.target)
            if (target) {
                el.addEventListener('click', () => {
                    const y =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        this.scrollToOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                    return false
                })
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App(appConfig || {})
})
