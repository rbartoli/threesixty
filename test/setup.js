import { jsdom } from 'jsdom'

const document = jsdom('<!doctype html><html><body></body></html>', {
  features: {
    FetchExternalResources : ['img']
  }
})

global.document = document
global.window = document.defaultView
global.navigator = global.window.navigator
global.Image = global.window.Image
global.MouseEvent = global.window.MouseEvent

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

