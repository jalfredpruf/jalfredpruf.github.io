let itemSize;
itemSize=100;

let hpmax, bowmax;
hpmax=150;
bowmax=150;


let items=[];


let carta, pasta;



function preload(){
  // preload() runs once
  print("LOADING");
  carta = loadImage("imgs/carta_pix.png", "png");
  pasta =loadImage("imgs/pasta_pix.png", "png");
  carrello=loadImage("imgs/carrello.png", "png");
  
}



let kind, im;
let state;

let h, w;
let health, bowel, happy;
let Nstock=10;


let spesaButton;
let NItems;
let lost;
let time;
function setup() {
  let i;
  lost=false;
  
  time=0;
    h=850;
  w=1150;
  createCanvas(1150, 850);
  NItems=Nstock;
  
  
  
  for(i=0; i<Nstock; i++) {
    let r=random(1);
    if(r>0.3){
      kind="pasta";
      im=pasta;}
    else{
      kind="carta";
      im=carta;}
      
  items[i]=new Item(kind, i, im);
  
  }
 

health=hpmax;
bowel=0.;
happy=50.;
state=new StateBar(health, bowel);



 spesaButton=new Item("carrello", -1, carrello);
 spesaButton.pos.x=200;
 spesaButton.pos.y=650;
}

let k;


function draw() {
  
 
  
    if(lost){
   background(color(255, 0, 0));
   
  }else{
      time+=1;
  
  background(0);}
  
   textSize(35);
  textFont("Georgia");
  fill(255);
  text("Day of infection: "+int(time/50), 400, 400);
  

  for(k=0; k<NItems; k++)
  {items[k].Update(); items[k].Show();}
  
  
  //show bars
  state.Show();
  state.hp-=0.2;
  if(state.bowel==bowmax) state.hp-=0.5;
  state.bowel+=0.2;
  
  
  spesaButton.Show();
  
  
  if(state.hp<=0) lost=true;
  

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

function mouseClicked(){
  
  if(!lost){
  let i;
 mouseP=new Point(mouseX, mouseY);
 for(i=0; i<NItems; i++) 
 {
  if(Dist(items[i].pos, mouseP)<itemSize/2){
    print("Clicked on "+i+" which is "+items[i].kind);
    //state.hp+=100; 
    items[i].Action();
      for(j=i; j<NItems-1; j++){
        
      items[j]=items[j+1].Get();
      items[j].n-=1;
     //  print("ITEM now is "+items[j].n);
      }
      NItems-=1;
     // print(NItems+"****");
      }
 }
 
 if(Dist(mouseP, spesaButton.pos)<itemSize/2){
  if(NItems<Nstock) 
  {
     let r=random(1);
    if(r>0.3){
      kind="pasta";
      im=pasta;}
    else{
      kind="carta";
      im=carta;}
      
  items[NItems]=new Item(kind, NItems, im);
  NItems+=1;
    
  }
   
 }
 
  }
 
}
