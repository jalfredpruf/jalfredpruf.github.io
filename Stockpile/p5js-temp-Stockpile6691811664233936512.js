let itemSize;
itemSize=100;

let hpmax, bowmax;
hpmax=150;
bowmax=150;


let items=[];


let carta, pasta;



function preload() {
  // preload() runs once
  print("LOADING");
  carta = loadImage("imgs/carta_pix.png", "png");
  pasta =loadImage("imgs/pasta_pix.png", "png");
  carrello=loadImage("imgs/carrello.png", "png");
  pillola=loadImage("imgs/crocerossa_tr.png", "png");
}



let kind, im;
let state;

let h, w;
let health, bowel, happy;
let Nstock=10;


let spesaButton;
let NItems;
let lost, win;
let time;

let pills=[];
let NPills;
let infected;
function setup() {

  let i;
  lost=false;
  win=false;
  infected=false;
  time=0;
  h=850;
  w=1150;
  createCanvas(1200, 500);
  NItems=Nstock;
  NPills=3;



  for (i=0; i<Nstock; i++) {
    let r=random(1);
    if (r>0.3) {
      kind="pasta";
      im=pasta;
    } else {
      kind="carta";
      im=carta;
    }

    items[i]=new Item(kind, i, im);
  }


  health=hpmax;
  bowel=0.0;
  happy=50.0;
  state=new StateBar(health, bowel);



  spesaButton=new Item("carrello", -1, carrello);
  spesaButton.pos.x=540;
  spesaButton.pos.y=100+itemSize*2+40;


  for (i=0; i<NPills; i++) {
    pills[i] = new Item("pill", i+4, pillola);
    pills[i].y0=220;
    pills[i].Update();
  }
}

let k;

let reftime=200;
function draw() {



  if (time/reftime==14) {
    win=true; 
    print("WIN");
  }


  if (lost & !win) {
    background(color(255, 0, 0));
  } else
  {
    time+=1;
    background(0);
    if (infected) {
      background(color(180, 70, 0));
    }
  }

  if (win) {
    background(color(0, 255, 0)); 
    time=14;
  }



  textSize(35);
  textFont("Georgia");
  fill(255);
  text("Day of infection: "+int(time/reftime), 100, 100+itemSize+20);

  fill(125);
  rect(100-5, 100-itemSize/2-5, Nstock*itemSize+10, itemSize+10);
  for (k=0; k<NItems; k++)
  {
    items[k].Update(); 
    items[k].Show();
  }


  //show bars
  state.Show();
  if (!win) {
    state.hp-=0.2;
    state.bowel+=0.15;
  }
  if (state.bowel==bowmax & !win) {
    state.hp-=0.5;
  }

  spesaButton.Show();
  for (k=0; k<NPills; k++) pills[k].Show();

  if (state.hp<=0 & !win) lost=true;

  if (infected & !win ) state.hp-=0.5;
}


function keyReleased() {

  /*  if (keyCode == DOWN_ARROW) {
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
   }*/
  if (key=='r') {
    setup();
  }
}

let dummy;

function mouseClicked() {

  if (!lost & !win) {
    let i;
    mouseP=new Point(mouseX, mouseY);
    for (i=0; i<NItems; i++) 
    {
      if (Dist(items[i].pos, mouseP)<itemSize/2) {
        print("Clicked on "+i+" which is "+items[i].kind);
        //state.hp+=100; 
        items[i].Action();
        for (j=i; j<NItems-1; j++) {

          items[j]=items[j+1].Get();
          items[j].n-=1;
          //  print("ITEM now is "+items[j].n);
        }
        NItems-=1;
        // print(NItems+"****");
      }
    }

    if (Dist(mouseP, spesaButton.pos)<itemSize/2) {
      if (NItems<Nstock) 
      {
        let r=random(1);
        if (r>0.3) {
          kind="pasta";
          im=pasta;
        } else {
          kind="carta";
          im=carta;
        }

        items[NItems]=new Item(kind, NItems, im);
        NItems+=1;

        r=random(1);
        if (r<0.25+time/reftime/14*0.15) infected=true;
      }
    }


    for (i=0; i<NPills; i++) 
    {
      if (Dist(pills[i].pos, mouseP)<itemSize/2) {
        print("Clicked on "+i+" which is "+pills[i].kind);
        //state.hp+=100; 
        pills[i].Action();
        for (j=i; j<NPills-1; j++) {

          pills[j]=pills[j+1];
          pills[j].n-=1;
          pills[j].Update();
          //  print("ITEM now is "+items[j].n);
        }
        NPills-=1;
        // print(NItems+"****");
      }
    }
  }
}
