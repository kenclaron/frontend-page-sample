export default class ChangePlan {
  selectorClassName = 'plan-switcher'
  textContentPlanClassName = 'plan'
  featureClosedClassName = '_closed'

  constructor(config) {
      if (typeof config === 'object') {
          Object.keys(config).forEach((key) => {
              this[key] = config[key]
          })
      }

      this.addEvents(this.getTextContentPlanElement())
  }

  addEvents(textContentElement) {
    document
      .querySelectorAll(`.${this.selectorClassName}`)
      .forEach(el => el.addEventListener(
          'click',
          (ev) => {
              if (textContentElement.classList.contains('_changed')) return false

              textContentElement.textContent = this.generate(16)

              textContentElement.classList.add('_changed')
          },
          true
      )
    )
  }

  getTextContentPlanElement() {
    return document.querySelectorAll(`.${this.textContentPlanClassName}`).item(0)
  }

  generate(n) {
    let add = 1, max = 12 - add
    
    if ( n > max ) {
      return this.generate(max) + this.generate(n - max)
    }
    
    max        = Math.pow(10, n+add)
    let min    = max / 10
    let number = Math.floor( Math.random() * (max - min + 1) ) + min
    
    return number.toString().substring(add) 
  }
}
