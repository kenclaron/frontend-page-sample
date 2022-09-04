export default class ChangeContent {
  selectorMenuClassName = 'menu'
  selectorScreenClassName = 'screen'
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
      .querySelectorAll(`.${this.selectorMenuClassName} li a`)
      .forEach(el => el.addEventListener(
          'click',
          (ev) => {
            document.querySelectorAll(`.${this.selectorScreenClassName}`).forEach(card => {
              if (card.classList.contains(el.getAttribute('href').substring(1)) ) {
                this.hideCardElements()
                this.unselectMenuElements()

                card.classList.add(this.visibleClassName)

                el.parentElement.classList.add(this.selectedClassName)
              }
            
            })
          },
          true
      )
    )
  }

  hideCardElements() {
    document.querySelectorAll(`.${this.selectorScreenClassName}`).forEach(el => {
      el.classList.remove(this.visibleClassName)
    })

    return true
  }

  unselectMenuElements() {
    document.querySelectorAll(`.${this.selectorMenuClassName} li`).forEach(el => {
      el.classList.remove(this.selectedClassName)
    })

    return true
  }

  getTextContentPlanElement() {
    return document.querySelectorAll(`.${this.textContentPlanClassName}`).item(0)
  }
}
