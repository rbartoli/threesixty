# Threesixty

![Npm package version](https://img.shields.io/npm/v/threesixty.svg?style=flat-square)
![Travis](https://img.shields.io/travis/rbartoli/threesixty.svg?style=flat-square)
![Npm total dowloads](https://img.shields.io/npm/dt/threesixty.svg?style=flat-square)
![License](https://img.shields.io/github/license/rbartoli/threesixty.svg?style=flat-square)

A minimal, dependency-free vanilla 360° slider.

## Demo
<a href="http://jsfiddle.net/gh/get/library/pure/rbartoli/threesixty/tree/master/example"><img src="https://github.com/rbartoli/threesixty/raw/master/example/screenshot.png" width="574"></a>

[Demo](http://jsfiddle.net/gh/get/library/pure/rbartoli/threesixty/tree/master/example)

## Features
- Super easy to set up
- No dependencies
- Touch events

##  Installation
```bash
npm install --save threesixty
```

## Usage
### `threesixty(container*, images*, options?)`
Initialise `threesixty` by passing both `container` and `images` required arguments.

#### `container`
The _Element_ to display the slider in.

#### `images `
An _Array_ containing a list of images.

```js
var container = document.querySelector('#slider');
var images = [
  'images/sequence-01.jpg',
  ...
  'images/sequence-50.jpg'
]

var slider = threesixty(container, images);
slider.init()
```

## Options
You can also provide an `options` object. Here's an **overview of the default values**.

```js
threesixty(container, images, {
  interactive: true,
  currentImage: 0
});
```

#### `options.interactive`
Enable or disable mouse interactivity.

#### `options.currentImage`
Set the current image index.

## API
Method | Arguments               | Method Description
-----------|----------------------------------|-------------------------------------------------------------------------------------
`init`     |                      | Initialise the slider
`previous`  |                             | Go back to the previous frame
`next`  |                             | Advance to the next frame
`isInteractive`  |                             | Returns `options.interactive` value
`getCurrentFrame`  |                             | Returns `options.currentFrame` value

## Tests
```bash
npm test
```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
