import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>', {
  features: {
    FetchExternalResources : ['img']
  }
})
global.window = document.defaultView
global.navigator = global.window.navigator
global.Image = global.window.Image
global.MouseEvent = global.window.MouseEvent
