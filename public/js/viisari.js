window.onload = function () {
  // valitaan svg-mittarit
  const s1 = Snap('#mittari1');
  const s2 = Snap('#mittari2');
  const s3 = Snap('#mittari3');

  // valitaan mittareiden animoitavat osat
  const viisari = s1.select('#viisari');
  const tanko = s3.select('#tanko');
  const valo = s2.select('#valo');

  // vesimittarin parametreja
  let korkeus = 10;
  var tanko_y = tanko.attr('y');
  var tanko_y = tanko_y * 1;

  // initialisointia
  valo.attr({ fill: '#b43831' }); // punainen valo
  tanko.attr({ height: korkeus });

  // animaatiomatriiseja
  const valoMatrix = new Snap.Matrix();
  const valoMatrixReset = new Snap.Matrix();
  const tankoMatrix = new Snap.Matrix();
  const tankoMatrixReset = new Snap.Matrix();
  const tankoMatrix0 = new Snap.Matrix();

  tankoMatrix0.translate(-374.28254, 184.83979);
  valoMatrix.translate(-207.76816, 203.9206);
  valoMatrixReset.translate(0, 0);
  tankoMatrix.translate(-382.83208, 371.28941);
  tankoMatrixReset.translate(43.285031, -25.971017);

  // luvut animointia varten jotta päästään alkuun, korvataan luvuilla jotka ladataan json-tiedostosta
  const lukemat = {
    a: [50, 60, 40, 20, 80, 30, 90],
  };

  let vii_index = 0;
  let vii_length = lukemat.a.length;

  // valomerkki, punainen kun json-data ladataan
  function valomerkki(valopaalle) {
    if (valopaalle == true) {
      valo.animate({ fill: '#b43831' }, 700, lataus); // valo päälle
    } else {
      valo.animate({ fill: '#d8d9da' }, 700); // valo pois
    }
  }

  var lataus = function lataus() {
    $.getJSON("lukemat2.json", function(tulos){
      lukemat.a = tulos.a;
      vii_length = tulos.a.length;
      valomerkki(false); // valo pois
    });
  };

  function paivita() {
    valomerkki(true);
  }

  // valo pois alkuun
  paivita(false);

  const bbox = viisari.getBBox(); // bounding box, get coords and centre

  // neliönmuotoisen vesimittarin päivitys, kutsutaan viiCounterista kun lukemat-taulukko on käyty läpi
  function vesimittari() {
    // päivitetään mittarin korkeus, y-koordinaattia pitää pienentää
    korkeus += 10;
    tanko_y -= 10;

    if (korkeus == 120) {
      korkeus = 10;
      tanko_y = 1036;
    }

    tanko.animate({ height: korkeus }, 2000);
    tanko.animate({ y: tanko_y }, 2000);
  }

  // viisarin animointi lukemataulukon mukaan
  function viiCounter() {
	viisari.animate({ transform: "r"+lukemat.a[vii_index]+"," + bbox.cx + ',' + bbox.cy + "s1,1," + bbox.cx + "," + bbox.cy}, 300);

    if (vii_index == vii_length) {
      vii_index = 0;
      vesimittari();
    } else {
      vii_index += 1;
    }
  } // viiCounter

  const animdelay = setInterval(viiCounter, 300);
  const updatedelay = setInterval(paivita, 5000);
};
