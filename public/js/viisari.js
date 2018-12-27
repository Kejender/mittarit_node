console.log("start");

window.onload = function() {

// valitaan svg-mittarit
var s1 = Snap("#mittari1");
var s2 = Snap("#mittari2");
var s3 = Snap("#mittari3");

// valitaan mittareiden animoitavat osat
var viisari = s1.select("#viisari");
var tankom = s3.select("#tankom");
var tanko = s3.select("#tanko");
var valo = s2.select("#valo");
var valomittari = s2.select("#valomittari");
var korkeus = 10;
var tanko_y = tanko.attr("y");
var tanko_y = tanko_y*1;

var screen_orient = screen.orientation;

valo.attr({fill: "#b43831"});
tanko.attr({height: korkeus+"px" });

var valoMatrix = new Snap.Matrix();
var valoMatrixReset = new Snap.Matrix();
var tankoMatrix = new Snap.Matrix();
var tankoMatrixReset = new Snap.Matrix();
var tankoMatrix0 = new Snap.Matrix();

tankoMatrix0.translate(-374.28254,184.83979);
valoMatrix.translate(-207.76816,203.9206);
valoMatrixReset.translate(0,0);
tankoMatrix.translate(-382.83208,371.28941);
tankoMatrixReset.translate(43.285031,-25.971017);

var lukemat = {
"a": [50, 60, 40, 20, 80, 30, 90]
};

var vii_index = 0;
var vii_length = lukemat.a.length;

var lataus = function lataus(){

$.getJSON("lukemat2.json", function(tulos){
console.log("tulos "+tulos.a[3]);
lukemat.a = tulos.a;
vii_length = tulos.a.length;
valo.animate({fill: "#d8d9da"}, 700);
});

}

function paivita(){
valo.animate({fill: "#b43831"}, 700, lataus);
}

paivita();

var avaimet = Object.keys(lukemat);
var bbox = viisari.getBBox(); //bounding box, get coords and centre

function viiCounter(){

viisari.animate({ transform: "r"+lukemat.a[vii_index]+"," + bbox.cx + ',' + bbox.cy + "s1,1," + bbox.cx + "," + bbox.cy}, 300);

if (vii_index == vii_length){
vii_index = 0;
korkeus = korkeus+10;
tanko_y = tanko_y-10;

if (korkeus == 100)
{
korkeus = 10;
tanko_y = 1036;}
else{
tanko.animate({height: korkeus+"px"}, 300);
tanko.animate({y: tanko_y+"px"}, 300);}

}
else{
vii_index+=1;
}

} //viiCounter

var animdelay = setInterval(viiCounter, 300);
var updatedelay = setInterval(paivita, 5000);
};