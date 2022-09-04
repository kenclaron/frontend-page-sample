export default class ChangeTile {
  selectorTabsClassName = 'tab'
  selectorTileClassName = 'tile'
  selectedClassName = '_selected'
  visibleClassName = '_visible'

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
      .querySelectorAll(`.${this.selectorTabsClassName}`)
      .forEach(el => el.addEventListener(
          'click',
          (ev) => {
            document.querySelectorAll(`.${this.selectorTileClassName}`).forEach(tile => {
              if (tile.classList.contains(el.getAttribute('data-href').substring(1)) ) {
                this.hideTileElements()
                this.unselectTabElements()

                tile.classList.add(this.visibleClassName)

                el.classList.add(this.selectedClassName)

                this.animateElements(tile)
              }
            })
          },
          true
      )
    )
  }

  animateElements(tile) {
    let startClassName = 'limits'
    let endClassName = 'invoices'

    if (tile.classList.contains('limits')) {
      startClassName = 'invoices'
      endClassName = 'limits'
    }

    let progressStart = document.querySelectorAll(`.${startClassName} .limit progress`)
    let progressEnd = document.querySelectorAll(`.${endClassName} .limit progress`)

    for (let i = 0; i < progressStart.length; i++) {
      let currentValue = progressStart[i].getAttribute('value')
      let newValue = progressEnd[i].getAttribute('value')

      progressEnd[i].setAttribute('value', currentValue)

      setTimeout(() => {
        progressEnd[i].setAttribute('value', newValue)
      }, 0)
    }

    return true
  }

  hideTileElements() {
    document.querySelectorAll(`.${this.selectorTileClassName}`).forEach(el => {
      el.classList.remove(this.visibleClassName)
    })

    return true
  }

  unselectTabElements() {
    document.querySelectorAll(`.${this.selectorTabsClassName}`).forEach(el => {
      el.classList.remove(this.selectedClassName)
    })

    return true
  }

  getTextContentPlanElement() {
    return document.querySelectorAll(`.${this.textContentPlanClassName}`).item(0)
  }
}
