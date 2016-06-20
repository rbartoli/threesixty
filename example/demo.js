/*global threesixty:true*/

function generateImagesToPreload(totalImages) {
  for (var i = 0, images = [], index; i < totalImages; i++) {
    index = (i < 10) ?  '0' + i : i
    images.push('https://github.com/rbartoli/threesixty/raw/master/example/images/sequence-' + index + '.png')
  }

  return images
}

document.addEventListener('DOMContentLoaded', function(){
  var instance = threesixty(
    document.querySelector('#one'),
    generateImagesToPreload(27)
  )
  instance.init()
})
