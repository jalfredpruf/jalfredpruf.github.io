let sbSize;
sbSize=34;

class StateBar{
  
   constructor(hp, bowel, sleep, hpim, bowim, sleepim){
      this.hp=1.0*hp;
      this.bowel=1.0*bowel;
      this.sleep=1.0*sleep;
      
      this.hpim=hpim;
      this.hpim.resize(sbSize, sbSize);
      this.bowim=bowim;
      this.bowim.resize(sbSize,sbSize);
      this.sleepim=sleepim;
      this.sleepim.resize(sbSize,sbSize);
    }

   Show(){
     
     
     image(this.hpim, 60, 305);
       fill(125);
  rect(95, 295, 210, 50);
     fill(0);
     rect(100, 300, 200, 40);
     
     if(this.hp<=0) this.hp=0;
     
      let f;
     
      if(this.hp>hpmax) {this.hp=hpmax;}
      
      f=this.hp/hpmax;
      
      fill(color(255*(1-f), f*255, 0));
     rect(100, 300, f*200, 40);
    
  
       image(this.bowim, 60, 405);
  fill(125);
  rect(95, 395, 210, 50);
      fill(0);
     rect(100, 400, 200, 40);
     
   if(this.bowel>=bowmax) this.bowel=bowmax
 
 if(this.bowel<0) {this.bowel=0;}
 
       f=this.bowel/bowmax;

      
      fill(color(255*f, (1-f)*255, 0));
      rect(100, 400, f*200, 40);
    
    
    image(this.sleepim, 60, 505);
  fill(125);
  rect(95, 495, 210, 50);
      fill(0);
     rect(100, 500, 200, 40);
     
   if(this.sleep>=sleepmax) this.sleep=sleepmax
 
 if(this.sleep<0) {this.sleep=0;}
 
       f=this.sleep/sleepmax;

      
      fill(color(255*f, (1-f)*255, 0));
      rect(100, 500, f*200, 40);
    
  
  
}
}


class Item{
  
  
constructor(kind, n, im){
   this.kind=kind;
   this.n=n;
   this.pos=new Point(0, 0);
   im.resize(itemSize, itemSize);
   this.img=im;
   this.x0=100;
   this.y0=100;
   //print("Items "+this.n+" is "+this.kind);
   } 
 
Update(){
   
   let x=this.x0+this.n*itemSize+itemSize/2;
   let y=this.y0;
   this.pos= new Point(x, y);
    
  }
 
 
 Show(){
    

   image(this.img, this.pos.x-itemSize/2, this.pos.y-itemSize/2); 
 }


 Get(){
  let dummy=new Item(this.kind, this.n, this.img);
  dummy.Update();
  return dummy;
 }
 
 
 Action(){
  if(this.kind=="pasta") {state.hp+=40; state.bowel+=20;}
  if(this.kind=="carta") state.bowel-=40;
  if(this.kind=="pill"){ state.hp=hpmax; infected=false;}
  if(this.kind=="sonnifero") {state.sleep-=50;}
   
 }
 
}
