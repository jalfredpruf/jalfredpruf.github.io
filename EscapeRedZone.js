//ESCAPE THE RED ZONE COVID19
//UN GIOCHINO SCEMO DI
//******ALFREDOSCIORTINO****9.3.2020***alfredo.sciortino**chiocciola***tiscali.it

let N, Nx, s, delta;
Nx=10;
N=Nx*Nx;
delta=10
  s=(800-Nx*delta-2*delta)/Nx;




class Grid { 

  constructor(X, Y, C, N) {
    this.x=X;
    this.y=Y;
    this.c=C;
    this.n=N;
  }

  Show() {
    fill(this.c);
    rect(this.x, this.y, s, s, s/4);
  }
} 



class Point {

  constructor(X, Y) {
    this.x=X;
    this.y=Y;
  }
}

function SamePoint(p1, p2) {
  if ( (p1.x==p2.x) & (p1.y==p2.y) ) return true;
  return false;
}

function RandomPosition(x0, y0) {
  let x, y;
  x=x0+int((Nx-x0)*random(1));
  y=y0+int((Nx-y0)*random(1));
  let p=new Point(x, y);
  return p;
}


class Player {

  constructor(X, Y, img) {
    this.mex=X;
    this.mey=Y;
    this.life=10;
    this.pos=new Point(X, Y);
    this.me = img;
    this.me.resize(int(s*0.8), int(s*0.8));

    let th=random(1)*2*3.1415;
    this.vx=2*cos(th);
    this.vy=2*sin(th);


    this.accumx=this.mex;
    this.accumy=this.mey;
  }



  Move(dx, dy) {

    let lambda=0.05;
    let r=random(1);
    if (r<lambda) {
      let th=random(1)*2*3.1415;
      this.vx=2*cos(th);
      this.vy=2*sin(th);
    }
    this.accumx+=this.vx*dx;
    this.accumy+=this.vx*dy;
    this.mex=int(this.accumx);
    this.mey=int(this.accumy);
    this.Update();
  }

  Set(x, y) {
    this.mex=x;
    this.mey=y;
    this.pos.x=mex;
    this.pos.y=mey;
  }

  Update() {

    if (this.mex>=Nx) {
      this.mex=Nx-1; 
      this.vx=-1*this.vx;
    }
    if (this.mey>=Nx) {
      this.mey=Nx-1; 
      this.vx=-1*this.vx;
    }
    if (this.mex<0) {
      this.mex=0; 
      this.vx=-1*this.vx;
    }
    if (this.mey<0) {
      this.mey=0;
      this.vx=-1*this.vx;
    }

    this.pos.x=this.mex;
    this.pos.y=this.mey;
  }

  Show() {
    image(this.me, delta+this.mex*(s+delta)+0.1*s, delta+this.mey*(s+delta)+0.1*s);
  }
}


let boxes=[];
let travellers=[];
let Ntrav;
Ntrav=5;

let train;
let player;
let trav;

function preload() {
  // preload() runs once
cool=loadImage("https://i.imgur.com/uV7pQmX.png", "png");
train=loadImage("https://i.imgur.com/lBvflQH.png", "png");
trav=loadImage("https://i.imgur.com/nRWWulT.png", "png");
croce=loadImage("https://i.imgur.com/7uc3O88.png", "png");
crocesmall=loadImage("https://i.imgur.com/7uc3O88.png", "png");
  //train = loadImage('train.jpg');
  //cool= loadImage('cool.jpg');
  //trav=loadImage('trav.png');
}

let win, lost;
let disinfettato;
let staz;

let lev;
lev=1;

let time, safetime;

function setup() {
 
  time=0
  safetime=0
  player=new Player(0, 0, cool);
  createCanvas(1150, 850);

  win=false;
  lost=false;
  disinfettato=false;
  staz=RandomPosition(5, 5);
  amuchina=RandomPosition(3, 3);
  train.resize(s*0.8, s*0.8);
  croce.resize(s*0.8, s*0.8);
  crocesmall.resize(s*0.3, s*0.3);


  let Nx=10;

  let i, j, n;
  n=0;
  for (i=0; i<Nx; i++) {
    for (j=0; j<Nx; j++) {
      boxes[n]=new Grid(delta + i*(delta+s), delta + j*(delta+s), color(255, 255, 255), n);
      n+=1;
    }
  }

  for (i=0; i<Ntrav; i++) {
    let pt=RandomPosition(2, 2);
    travellers[i]=new Player(pt.x, pt.y, trav);
  }
}


let xx, yy;
xx=0;
yy=0;





function draw() {
 
 background(255);

  textSize(20);
  textFont("Georgia");
  
  let instr = 'INSTRUCTIONS:\n The Coronavirus has reached your city and it will soon be in lockdown: you need to escape!\n '+
  'Reach the station to escape the Red Zone but beware: others had your same idea and may be contagious: avoid them!\nDisinfectant will protect you but for a short time!\n\n Arrows to move\n\n "r" start over or advance to the next level\n\n "k" to reset the enemies to level 1.\n\n\n LEVEL: '+lev+"\n\n\n'Escape the Red Zone'\n\n   a dumb game\n   by Alfredo Sciortino";
  fill(50);
  text(instr, 800, 2*delta, 300, 800); // Text wraps within text box
  
  

  for (i=0; i<N; i++) {
    boxes[i].Show();
  }

  image(train, delta+staz.x*(s+delta)+0.1*s, delta+staz.y*(s+delta)+0.1*s);
  if(time%200==0 & !disinfettato)   {amuchina=RandomPosition(5, 5); amuchina.x-=3; amuchina.y-=3;}
  if(!disinfettato) image(croce, delta+amuchina.x*(s+delta)+0.1*s, delta+amuchina.y*(s+delta)+0.1*s);



  for (i=0; i<Ntrav; i++) {
    travellers[i].Move(0.03, 0.03);
    travellers[i].Show();
    //print(travellers[i].pos.x);
    if (SamePoint(player.pos, travellers[i].pos)& (!win) & (!disinfettato)) lost=true;
  }




  if (SamePoint(player.pos, staz)) win=true;
  if (SamePoint(player.pos, amuchina) & (!disinfettato)) {disinfettato=true; amuchina=RandomPosition(4, 4); amuchina.x-=4; amuchina.y-=4;}

  if(disinfettato) { safetime+=1;  image(crocesmall, delta+player.pos.x*(s+delta)+0.1*s+0.3*s, delta+player.pos.y*(s+delta)+0.1*s-0.3*s);}
  if(safetime==60) {disinfettato=false; safetime=0; }

  


  if (win) {
    for (i=0; i<N; i++) boxes[i].c=color(0, 255, 0);
  }

  if (lost& !win ) {
    for (i=0; i<N; i++) boxes[i].c=color(255, 0, 0);
  }


  player.Update();
  player.Show();
  time+=1;

}//end main


function keyReleased() {
  if (win==false & lost==false) {
    if (keyCode == DOWN_ARROW) {
      player.mey+=1;
    }

    if (keyCode == UP_ARROW) {
      player.mey-=1;
    }
    if (keyCode == RIGHT_ARROW) {
      player.mex+=1;
    }
    if (keyCode == LEFT_ARROW) {
      player.mex-=1;
    }
  }

  if (key=='r') {
    if (win) {Ntrav+=1; lev+=1;}
    setup();
  }
  if (key=='k') {
    Ntrav=5;
    lev=1;
    setup();
  }
}
