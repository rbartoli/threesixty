import { expect } from 'chai'
import threesixty from '../src'

const TIMEOUT = 200
const DUMMY_IMAGE = 'transparent.png'
const IMAGES = [DUMMY_IMAGE, DUMMY_IMAGE, DUMMY_IMAGE, DUMMY_IMAGE]
const IMAGES_LENGTH = IMAGES.length
const LAST_IMAGE_INDEX = IMAGES_LENGTH - 1
let container



const clickAndDrag = (distance = 1) => {
  let event = new MouseEvent('mousedown')
  container.dispatchEvent(event)

  event = new MouseEvent('mousemove')
  event.pageX = distance
  document.dispatchEvent(event)

  event = new MouseEvent('mouseup')
  document.dispatchEvent(event)
}



describe('public api', () => {
  let instance

  beforeEach(() => {
    container = document.createElement('div')
    instance = threesixty(container, IMAGES)
  })

  it('should expose init method', () => {
    const actual = instance.init
    const expected = 'function'

    expect(actual).to.be.a(expected)
  })

  it('should expose previous method', () => {
    const actual = instance.previous
    const expected = 'function'

    expect(actual).to.be.a(expected)
  })

  it('should expose next method', () => {
    const actual = instance.next
    const expected = 'function'

    expect(actual).to.be.a(expected)
  })

  it('should expose isInteractive method', () => {
    const actual = instance.isInteractive
    const expected = 'function'

    expect(actual).to.be.a(expected)
  })

  it('should expose getCurrentFrame method', () => {
    const actual = instance.getCurrentFrame
    const expected = 'function'

    expect(actual).to.be.a(expected)
  })
})



describe('arguments', () => {

  before(() => {
    container = document.createElement('div')
  })

  it('should require a container argument', function() {
    const actual = () => { threesixty() }
    const expected = Error

    expect(actual).to.throw(expected)
  })

  it('should require an IMAGES argument', () => {
    const actual = () => { threesixty(container) }
    const expected = Error

    expect(actual).to.throw(expected)
  })

  it('should instantiate if the required arguments are provided', () => {
    const actual = () => { threesixty(container, IMAGES) }
    const expected = Error

    expect(actual).to.not.throw(expected)
  })
})



describe('options', () => {
  const options = {
    interactive: false,
    currentFrame: 2
  }

  before(() => {
    container = document.createElement('div')
  })

  it('should instantiate without providing options', () => {
    const actual = () => { threesixty(container, IMAGES) }
    const expected = Error

    expect(actual).to.not.throw(expected)
  })

  it('should instantiate providing options', () => {
    const actual = () => { threesixty(container, IMAGES, options) }
    const expected = Error

    expect(actual).to.not.throw(expected)
  })

  it('should use defaults if no option is provided', () => {
    const instance = threesixty(container, IMAGES)
    const actual = instance.isInteractive()
    const expected = true

    expect(actual).to.equal(expected)
  })

  it('should use provided interactive option instead of default', () => {
    const instance = threesixty(container, IMAGES, options)
    const actual = instance.isInteractive()
    const expected = false

    expect(actual).to.equal(expected)
  })

  it('should use provided currentFrame option instead of default', () => {
    const instance = threesixty(container, IMAGES, options)
    const actual = instance.getCurrentFrame()
    const expected = 2

    expect(actual).to.equal(expected)
  })
})



describe('dom manipulation', () => {
  let instance

  before(() => {
    container = document.createElement('div')
    instance = threesixty(container, IMAGES)
    instance.init()
  })

  it('should add the first image to the container', (done) => {
    const expected = `<div><img src="${DUMMY_IMAGE}"></div>`
    setTimeout(() => {
      try {
        instance.next()
        const actual = container.outerHTML

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })
})



describe('previous/next image', () => {
  let instance

  beforeEach(() => {
    container = document.createElement('div')
    instance = threesixty(container, IMAGES)
    instance.init()
  })

  it('should advance to the next image', (done) => {
    const expected = 1
    setTimeout(() => {
      try {
        instance.next()
        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })

  it('should go back to the previous image', (done) => {
    const expected = LAST_IMAGE_INDEX
    setTimeout(() => {
      try {
        instance.previous()
        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })

  it('should display the first image if advancing from the last', (done) => {
    const expected = 0
    setTimeout(() => {
      try {
        for (let i = 0, l = IMAGES.length; i < l; i++) {
          instance.next()
        }
        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })

  it('should display the last image if going back from the first', (done) => {
    const expected = LAST_IMAGE_INDEX
    setTimeout(() => {
      try {
        instance.previous()
        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })
})



describe('mouse interaction', () => {
  let instance

  beforeEach(() => {
    container = document.createElement('div')
    instance = threesixty(container, IMAGES)
    instance.init()
  })

  it('should advance to the next image if dragging towards right', (done) => {
    const expected = 1
    setTimeout(() => {
      try {
        clickAndDrag()

        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })

  it('should go back to the previous image if dragging towards left', (done) => {
    const expected = LAST_IMAGE_INDEX
    setTimeout(() => {
      try {
        clickAndDrag(-1)

        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })

  it('should go back to the first image if dragging times is equal to total number of slides', (done) => {
    const expected = 0
    setTimeout(() => {
      try {
        IMAGES.forEach((item, i) => {
          clickAndDrag(i + 1)
        })

        const actual = instance.getCurrentFrame()

        expect(actual).to.equal(expected)
        done()
      } catch(e) {
        done(e)
      }
    }, TIMEOUT)
  })
})
