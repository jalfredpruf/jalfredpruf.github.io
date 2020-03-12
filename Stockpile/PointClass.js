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
  x=x0+int((1150-x0)*random(1));
  y=y0+int((850-y0)*random(1));
  let p=new Point(x, y);
  return p;
}


function Dist(p1, p2){
 return sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2); 
}
