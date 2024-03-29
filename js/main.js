// document.body.ontouchstart = function(eee){
//   eee.preventDefault()
// }

var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');
var lineWidth = 3

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
pen.onclick = function(){  //点 pen 的时候给自己一个类
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

// 画笔颜色
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
}
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.add('active')
  yellow.classList.remove('active')
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.add('active')
}

thin.onclick = function(){
  lineWidth = 3
}
medium.onclick = function(){
  lineWidth = 7
}
thick.onclick = function(){
  lineWidth = 12
}

clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height); //画一个空白大方形就行了
}

download.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画作'
  a.target = '_blank'
  a.click()
}
// eraser.onclick = function() {
//   eraserEnabled =true
//   actions.className = 'actions x'
  
// }
// brush.onclick = function(){
//   eraserEnabled = false
//   actions.className = 'actions'
// }


/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  // context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth  //原始画笔的粗细是 5px 
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}


function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  if(document.body.ontouchstart !== undefined){
    //触控设备
    canvas.ontouchstart = function(aaa){
      console.log('start')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(aaa){
      console.log('move')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(aaa){
      console.log('end')
      using = false
    }

  }else{
    //非触控设备
    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(aaa) {
      using = false
    }
  }

}