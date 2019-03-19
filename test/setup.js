const jsdom = require('jsdom')

class CustomResourceLoader extends jsdom.ResourceLoader {
  constructor () {
    super({ strictSSL: false })
  }

  fetch (url, options) {
    // Override the contents of this script to do something unusual.
    if (url === 'transparent.png') {
      const fs = require('fs')
      const path = require('path')
      const transparentImage = path.join(__dirname, 'transparent.png');
      return Promise.resolve(fs.readFileSync(transparentImage))
    }

    return super.fetch(url, options)
  }
}

const resourceLoader = new CustomResourceLoader()

const dom = new jsdom.JSDOM('<!doctype html><body></body></html>', {
  resources: resourceLoader
})

global.document = dom.window.document
global.Image = dom.window.Image
global.MouseEvent = dom.window.MouseEvent

