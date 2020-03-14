let itemSize;
itemSize=100;

let hpmax, bowmax, sleepmax;
hpmax=150;
bowmax=150;
sleepmax=150;

let items=[];


let carta, pasta;
let carrello, pillola, sleep_big, croce_small, bowel_small, sleep_small, reset;



function preload(){
  // preload() runs once
  print("LOADING");
  carta = loadImage("imgs/carta_pix.png", "png");
  pasta =loadImage("imgs/pasta_pix.png", "png");
  carrello=loadImage("imgs/carrello.png", "png");
  pillola=loadImage("imgs/crocerossa_tr.png", "png");
    sleep_big=loadImage("imgs/sleep_small.png", "png");
    pill=loadImage("imgs/pill_pix_small.png", "png");
  
  croce_small=loadImage("imgs/crocerossa_tr_small.png", "png");
  bowel_small=loadImage("imgs/bowel.png", "png");
  sleep_small=loadImage("imgs/sleep_small.png", "png");
  reset=loadImage("imgs/reset.png", "png");
}



let kind, im;
let state;

let h, w;
let health, bowel, sleep;
let Nstock=10;


let spesaButton;
let NItems;
let lost, win;
let time;

let pills=[];
let NPills;
let infected;
let sleeping;

let showInstr;
function setup() {
  
  let i;
  showInstr=true;
  lost=false;
  win=false;
  infected=false;
  sleeping=false;
  time=0;
  h=850;
  w=1150;
  createCanvas(1200, 600);
  NItems=Nstock;
  NPills=3;
  
  
  
  for(i=0; i<Nstock; i++) {
    let r=random(1);
    if(r>0.3){
      kind="pasta";
      im=pasta;}
    else{
      kind="carta";
      im=carta;}
      if(r>0.9) {kind="sonnifero"; im=pill;}
      
  items[i]=new Item(kind, i, im);
  
  }
 

health=hpmax;
bowel=0.0;
sleep=0.0;
state=new StateBar(health, bowel, sleep, croce_small, bowel_small, sleep_small);



 spesaButton=new Item("carrello", -1, carrello);
 spesaButton.pos.x=540;
 spesaButton.pos.y=100+itemSize*2+40;
 
 
 
 
  sleepButton=new Item("dormi", -1, sleep_big);
  sleepButton.pos.x=740;
  sleepButton.pos.y=100+itemSize*2+40;
  
  
  resetButton = new Item("reset", -1, reset);
  resetButton.pos.x=600;
  resetButton.pos.y=500;
 
 for(i=0; i<NPills; i++){
  pills[i] = new Item("pill", i+4, pillola);
  pills[i].y0=220;
  pills[i].Update();
  
  
 }
}

let k;

let reftime=200;

let instr="You are quarantined because of Covid-Sars-2. You need to resist 14 days indoors.\n\n If your life goes to 0 you loose. Eat food to survive.\n Eating fills up your stomach faster. A full stomach harms you. Use toilet papaer to solve that. \n"+
" Addiotionally, once in a while you need to sleep. Sleep deprivation harms you. You can use pills to sleep faster.\n\n You can only stockpile 10 items at once. Use the shopping cart to go shopping but be careful: as time passes, you might become infected and "+
"your health will decrease fast.\n Use the three given medkits to cure infections and restore your health. \n\n Can you reach day 14?!? Click to start. \n\n\n A game by AS";

function draw() {
 
  
   if(showInstr){
     background(0);
     fill(255);
     text(instr, 40, 40);
   } else {
  
  
  if(time/reftime==14) {win=true; print("WIN");}
     
  
    if(lost & !win ){
   background(color(255, 0, 0));
  }
  else
  {
       time+=1;
       background(0);
       if(infected) {background(color(180, 70, 0));}
       

  }
  
 
  
     if(win) {background(color(0, 255, 0)); time=14;}

 
  
   textSize(35);
  textFont("Georgia");
  fill(255);
  text("Day of infection: "+int(time/reftime), 100, 100+itemSize+20);
  
  if(sleeping) {text("(zzzz sleeping)", 100, 100+itemSize+60);}
  
fill(125);
  rect(100-5, 100-itemSize/2-5, Nstock*itemSize+10, itemSize+10);
  for(k=0; k<NItems; k++)
  {items[k].Update(); items[k].Show();}
  
 // print(state.sleep+"  "+state.bowel+"  "+state.hp);
  //show bars
  state.Show();
  if(!win) {state.hp-=0.2;state.bowel+=0.15;     state.sleep+=0.08;}
  if(sleeping) { state.sleep-=1;
  if(state.sleep<=0 | state.hp<=30 | state.bowel>bowmax-30) sleeping=false; 
  }
  if(state.bowel>=bowmax & !win) {
    state.hp-=0.35;

    
  }
    if(state.sleep>=sleepmax & !win) {
    state.hp-=0.65;
    
  }
  
  spesaButton.Show();
  sleepButton.Show();
  resetButton.Show();
  for(k=0; k<NPills; k++) pills[k].Show();
  
  if(state.hp<=0 & !win) lost=true;
  
  if(infected & !win ) state.hp-=0.5;
  
 } //end instructions loop
}



function keyReleased() {
  

  if (key=='r') {
    setup();
  }

}

let dummy;

function mouseClicked(){
   mouseP=new Point(mouseX, mouseY);
  if(showInstr) showInstr=false;
  
  if(Dist(mouseP, resetButton.pos)<itemSize/2) setup();

  if(!lost & !win){
  let i;

 for(i=0; i<NItems; i++) 
 {
  if(Dist(items[i].pos, mouseP)<itemSize/2 & !sleeping){
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
 if(Dist(mouseP, sleepButton.pos)<itemSize/2) sleeping=true;
 
 if(Dist(mouseP, spesaButton.pos)<itemSize/2 & !sleeping){
  if(NItems<Nstock) 
  {
     let r=random(1);
    if(r>0.3){
      kind="pasta";
      im=pasta;}
    else{
      kind="carta";
      im=carta;}
      if(r>0.9){kind="sonnifero"; im=pill;}
  items[NItems]=new Item(kind, NItems, im);
  NItems+=1;
  
  r=random(1);
  if(r<0.25+time/reftime/14*0.15) infected=true;
    
  }
   
 }
 
 
  for(i=0; i<NPills; i++) 
 {
  if(Dist(pills[i].pos, mouseP)<itemSize/2){
    print("Clicked on "+i+" which is "+pills[i].kind);
    //state.hp+=100; 
    pills[i].Action();
      for(j=i; j<NPills-1; j++){
        
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
