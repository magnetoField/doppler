let mojSzum=[];
let posX=0;
let prevX=0;
let prevY=0;
let szumik=0;
let Xskala=7;
function setup() {
  createCanvas(800, 600);
  for (let x=0; x<width; x++) {
   mojSzum[x]=noise(x/60)*4;
  }
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  if (posX>width){
    posX=0;
    frameCount=0;
    prevX=0;
    prevY=0;
  }
  szumik=1/mojSzum[(int(posX)%width)]*Xskala;
  posX+=1/mojSzum[(int(posX)%width)]*Xskala;
  ellipse(posX, height/4 , 40, 40);
  line(prevX,height/2-prevY,posX,height/2-szumik*10);
  prevX=posX;
  prevY=szumik*10;
}
