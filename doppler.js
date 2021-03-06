let snowflakes = []; // array to hold snowflake objects
let slider;
let doplColor;
let mojaLinia=[];
let sredniaLina=[];
let okres=0;
let period=2;
let czestotliwosc=[0];
let counter=0;
let szczyt1=0;
let szczyt2=0;

function simpleMovingAVG(dataObjArray, timePeriods){
let sum = 0;
let result = false;

try{
for (let i=timePeriods-1;i>-1;i--){
sum += dataObjArray[i];
}

result = (parseFloat(sum) / parseFloat(timePeriods));
//console.log('SMA Result : ' + result);
} catch(err) {
result = false;
console.log("SMA Error : " + err);
}

return result;
};

function setup() {
  frameRate(18);
  createCanvas(800, 600);
  stroke(240);
  noFill();
  slider = createSlider(-90, 90, 180);
  slider.position(10, 10);
  slider.style('width', '80px');

}

function draw() {
  background('black');
  let slidVal = slider.value();
  let t = frameCount / 60; // update time



  // create a random number of snowflakes each frame
  //for (let i = 0; i < 1; i++) {
    snowflakes.push(new snowflake(t)); // append snowflake object
  //}

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
  //for (let sa=0; sa< width; sa++) {
      doplColor=get(3*width/4,3*height/4);
      ellipse(mouseX,mouseY,10);
      mojaLinia[frameCount%width]=doplColor[0]+doplColor[1]+doplColor[2];
      //  if (sa>period){
      //  sredniaLina[sa]=simpleMovingAVG(mojaLinia.slice(sa-period,sa),period);
      //  mojaLinia[sa]=sredniaLina[sa];
      //}
      if ((mojaLinia[frameCount%width]==0) && (szczyt1==0)){
        szczyt2+=1;
      } else if (mojaLinia[frameCount%width]>0 && szczyt2>0) {
        czestotliwosc[counter]=100/(szczyt2);
        szczyt1=0;
        szczyt2=0;
        counter+=1;
        //if (counter>period) {
        //  for (let licznik=period; licznik<czestotliwosc.length ; licznik++) {
        //  czestotliwosc[licznik-period]= simpleMovingAVG(czestotliwosc.slice(licznik-period,licznik),period);
        //  }

        //}
        //czestotliwosc[counter]=czestotliwosc[counter]*2
        if (counter>width){
          counter=0;
        }
      }
    //  } else {
    //    czestotliwosc[sa+1]= czestotliwosc[sa];
    //  }

      //print(mojaLinia[sa]);
      //print(czestotliwosc);
  //}

  translate(width / 2, height / 2);


  //sredniaLina=simpleMovingAVG(mojaLinia,20);
  //print(doplColor);

  for (let x=1; x < czestotliwosc.length-period; x++) {
    strokeWeight(5);
    line((x-1)*30-width/2,-czestotliwosc[x-1],x*30-width/2,-czestotliwosc[x]);
    strokeWeight(1);
  };

  // line(frameCount-width/2,height,frameCount-width/2,doplColor[0]);
  //mojaLinia
  rotate(slidVal*PI/180);
  //l=line(0,0,width,0);
}

// snowflake class
function snowflake(time) {
  // initialize coordinates
  this.posY = 0;
  this.posX = time*(200*(noise(time)+1));
  this.initialangle = random(0, 2 * PI);
  this.size = 10;

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(height / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    //let w = 0.2; // angular speed
    //let angle = w * time + this.initialangle;
    //this.posY = height / 2 + this.radius * sin(angle);
    this.posY = height / 2;
    this.size += 20;
  //  this.size += pow(this.size,0.5);

    // different size snowflakes fall at slightly different y speeds
    //this.posX += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posX > width) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
