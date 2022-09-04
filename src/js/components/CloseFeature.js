export default class CloseFeature {
  selectorClassName = 'feature-close-link'
  featureClosedClassName = '_closed'

  constructor(config) {
      if (typeof config === 'object') {
          Object.keys(config).forEach((key) => {
              this[key] = config[key]
          })
      }

      this.addEvents()
  }

  addEvents() {
    document
      .querySelectorAll(`.${this.selectorClassName}`)
      .forEach(el => el.addEventListener(
          'click',
          (ev) => {
              const parent = ev.target.parentNode
              parent.classList.add(this.featureClosedClassName)
          },
          true
      )
    )
  }
}
