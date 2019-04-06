var cnvs, dc;
var LENGTH, P, TH;

window.onload = function(){

  cnvs = document.getElementById("myCanvas");
  cnvs.addEventListener("mousemove", GetPosition, false);
  dc = cnvs.getContext("2d");

  LENGTH = 140;
  P = 0.68;
  DEG = 30;
  TH = DEG * Math.PI / 180;

  Draw();
}

function Draw(){

  dc.fillStyle = "rgb(0,0,0)";
  dc.fillRect(0, 0, 640, 480);

  // パラメータ、数式を描画
  var obj = document.getElementById("parameter").querySelectorAll(".value");
  obj[0].innerHTML = DEG + " deg";
  obj[1].innerHTML = P;

  // 幹を描いて枝を描く
  DrawLine( 0,0,　0,LENGTH );
  MakeBranch( 0,0,　0,LENGTH, TH, P );

  // requestAnimationFrame(Draw);
}

// 枝を描く　th:傾き角　p:縮小比
function MakeBranch(xs,ys,xe,ye,th,p) {

  var x = xe - xs;
  var y = ye - ys;

  if( Math.sqrt(x**2 + y**2) < 3 ) return;

  // LEFT Branch
  var xl = ( Math.cos(th)*x - Math.sin(th)*y ) * p;
  var yl = ( Math.sin(th)*x + Math.cos(th)*y ) * p;
  var xls = xe;
  var yls = ye;
  var xle = xe + xl;
  var yle = ye + yl;
  DrawLine(xls,yls,xle,yle);
  MakeBranch(xls,yls,xle,yle,th,p);

  // RIGHT BRANCH
  var xr = ( Math.cos(-th)*x - Math.sin(-th)*y ) * p;
  var yr = ( Math.sin(-th)*x + Math.cos(-th)*y ) * p;
  var xrs = xe;
  var yrs = ye;
  var xre = xe + xr;
  var yre = ye + yr;
  DrawLine(xrs,yrs,xre,yre);
  MakeBranch(xrs,yrs,xre,yre,th,p);

}

function DrawLine(xs,ys,xe,ye){
  dc.strokeStyle = "rgb(255,255,255)";
  dc.beginPath();
  dc.moveTo(xs + cnvs.width/2, cnvs.height - ys);
  dc.lineTo(xe + cnvs.width/2, cnvs.height - ye);
  dc.stroke();
}

// マウスイベント対応
function GetPosition(e) {

  // マウスの座標からパラメータを取得
  var rect = e.target.getBoundingClientRect();
  mouseX = Math.floor( e.clientX - rect.left );
  mouseY = Math.floor( e.clientY - rect.top );

  P = Math.round( 76 * ( cnvs.height - mouseY ) / cnvs.height )/100;
  DEG = Math.floor( mouseX / cnvs.width * 90.0 );
  TH = DEG * Math.PI / 180;

  cnvs.removeEventListener("mousemove", GetPosition, false);

  Draw();

  cnvs.addEventListener("mousemove", GetPosition, false);
}

// ボタンイベント対応
function ChangeParameter(e){

  // nothing to do

  /*
  switch (e.target.eventParam) {
    case "Fx":
      fx++;
      break;
    case "Fy":
      fy++;
      break;
    default:
      break;
  }

  init();
  */

}
