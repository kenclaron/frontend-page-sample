export default class InitProgressBar {
  selectorTileClassName = 'tile'
  selectorProgress = 'progress'

  constructor(config) {
      if (typeof config === 'object') {
          Object.keys(config).forEach((key) => {
              this[key] = config[key]
          })
      }

      this.initialization()
  }

  initialization() {
    document.querySelectorAll(`.${this.selectorTileClassName} .limit ${this.selectorProgress}`).forEach(progress => {
      let value = progress.getAttribute('data-value')

      progress.setAttribute('value', value)
    })
  }
}
