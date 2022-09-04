export default class InputLabel {
    selectorClassName = 'js-label'
    labelEmptyClassName = '_label-empty'

    constructor(config) {
        if (typeof config === 'object') {
            Object.keys(config).forEach((key) => {
                this[key] = config[key]
            })
        }

        this.addEvents()

        document
            .querySelectorAll(`.${this.selectorClassName} input, .${this.selectorClassName} textarea`)
            .forEach((el) => {
                if (!el.value) {
                    const label = this.siblingLabel(el)
                    label.classList.add(this.labelEmptyClassName)
                }
            })
    }

    addEvents() {
        document.addEventListener(
            'focus',
            (ev) => {
                const parent = ev.target.parentNode
                if (parent.classList.contains(this.selectorClassName)) {
                    const label = this.childLabel(parent)
                    label.classList.remove(this.labelEmptyClassName)
                }
            },
            true
        )
        document.addEventListener(
            'blur',
            (ev) => {
                const el = ev.target
                if (!el.value) {
                    const parent = el.parentNode
                    if (parent.classList.contains(this.selectorClassName)) {
                        const label = this.childLabel(parent)
                        label.classList.add(this.labelEmptyClassName)
                    }
                }
            },
            true
        )
    }

    childLabel(el) {
        return Array.prototype.find.call(el.children, (child) => child.tagName === 'LABEL')
    }

    siblingLabel(el) {
        return this.childLabel(el.parentNode)
    }
}
