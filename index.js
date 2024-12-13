class Hotel {
  naziv
  adresa
  maxBrojSoba
  korisnici = []
  sobe = []
  usluge = []
  rezervacije = []
  statusSistema = true

  constructor(naziv, adresa, maxBrojSoba) {
    this.naziv = naziv
    this.adresa = adresa
    this.maxBrojSoba = maxBrojSoba
  }

  //Metoda koja kreira i dodaje sobe u hotel
  dodajSobe(broj, tip, cijena) {
    if (this.statusSistema === true) {
      let soba = new Soba(broj, tip, cijena)
      this.sobe.push(soba)
    } else {
      console.log('Sistem nije aktivan, nije moguce dodavati sobe u isti')
    }
  }

  //Dodaje usluge u hotel koje se mogu odabrati
  dodajUslugu(tip, cijenaPoDanu) {
    if (this.statusSistema === true) {
      let usluga = new Usluga(tip, cijenaPoDanu)
      this.usluge.push(usluga)
    } else {
      console.log('Sistem nije aktivan, nije moguce dodati usluge u isti.')
    }
  }

  ispisSoba() {
    if (this.statusSistema === true) {
      this.sobe.forEach((soba) => {
        console.log(soba)
      })
    } else {
      console.log('Nije moguce ispisati sobe, sistem nije aktivan')
    }
  }

  ispisUsluga() {
    if (this.statusSistema === true) {
      this.usluge.forEach((usluga) => {
        console.log(usluga)
      })
    } else {
      console.log('Nije moguce ispisati usluge, sistem nije aktivan')
    }
  }

  ispisKorisnika() {
    this.korisnici.forEach((korisnik) => {
      console.log(korisnik)
    })
  }

  //Metoda koja gasi sistem tj gasi hotel
  gasenjeSistema() {
    if (this.statusSistema === false) {
      console.log('Sistem je vec ugasen')
      return 0
    }
    this.statusSistema = false
    console.log('Sistem je ugasen')
  }

  aktiviranjeSistema() {
    if (this.statusSistema === true) {
      console.log('Sistem je vec aktivan')
      return 0
    }
    this.statusSistema = true
    console.log('Sistem je aktiviran')
  }
}

//Klasa za kreiranje noih soba(jednokrevetne, dvokrevet itd)
class Soba {
  constructor(broj, tip, cijena) {
    this.broj = broj
    this.tip = tip
    this.cijena = cijena
    this.dostupnost = true
  }

  oslobodi() {
    this.dostupnost = true
  }

  rezervisi() {
    this.dostupnost = false
  }
}

//Klasa za kreiranje novih usluga(masaza, bazen itd)
class Usluga {
  constructor(tip, cijenaPoDanu) {
    this.tip = tip
    this.cijenaPoDanu = cijenaPoDanu
  }
}
class Admin {
  ime
  constructor(ime) {
    ime = ime
  }

  registracijaKorisnika(
    ime,
    prezime,
    spol,
    brojLicneKarte,
    godine,
    brojSobe,
    tipSobe,
    vrijemePrijaveUHotel,
    korisnickoIme,
    lozinka,
    hotel
  ) {
    let korisnik = new Korisnik(
      ime,
      prezime,
      spol,
      brojLicneKarte,
      godine,
      brojSobe,
      tipSobe,
      vrijemePrijaveUHotel,
      korisnickoIme,
      lozinka
    )

    hotel.korisnici.push(korisnik)
  }

  urediKorisnika(korisnik, brojSobe, tipSobe, usluga, callback) {
    korisnik.brojSobe = brojSobe
    korisnik.tipSobe = tipSobe
    callback(usluga)
  }

  urediKorisnickeUsluge(korisnik, usluga, callback) {
    callback(usluga)
  }

  izdajRacun(korisnik) {
    let racun = 0
    for (let i = 0; i < korisnik.usluge.length; i++) {
      racun += korisnik.usluge[i].cijenaPoDanu
    }
    console.log(racun)
  }
}

class Korisnik {
  ime
  prezime
  spol
  #brijLičneKarte
  godine
  brojSobe
  tipSobe
  vrijemePrijaveUHotel
  #korisnickoIme
  #lozinka
  usluge = []

  constructor(
    ime,
    prezime,
    spol,
    brojLicneKarte,
    godine,
    brojSobe,
    tipSobe,
    vrijemePrijaveUHotel,
    korisnickoIme,
    lozinka
  ) {
    this.#brijLičneKarte = brojLicneKarte
    this.brojSobe = brojSobe
    this.godine = godine
    this.ime = ime
    this.#korisnickoIme = korisnickoIme
    this.#lozinka = lozinka
    this.prezime = prezime
    this.spol = spol
    this.tipSobe = tipSobe
    this.vrijemePrijaveUHotel = vrijemePrijaveUHotel
  }
}

//Provjera programa
let hotel = new Hotel('Hotel Sunce', 'Kralja Tomislava 54 88390 Neum', 100)
hotel.dodajSobe(1, 'Jednokrevetna', 20)
hotel.dodajSobe(2, 'Dvokrevetna', 40)
hotel.dodajSobe(3, 'Jednokrevetna', 20)
hotel.dodajUslugu('Teretana', 10)
hotel.dodajUslugu('Kino', 10)
hotel.dodajUslugu('Restoran', 20)
hotel.dodajUslugu('Bazen', 10)
hotel.dodajUslugu('Sauna', 10)

hotel.ispisSoba()
hotel.ispisUsluga()

let admin = new Admin('Emina')

admin.registracijaKorisnika(
  'Alma',
  'Mumić',
  'ž',
  '15OK043',
  18,
  1,
  'Jednokrevetna',
  '12.12.2024',
  'almica',
  'almica123',
  hotel
)
let alma = hotel.korisnici[0]

hotel.ispisKorisnika()
let teretana = hotel.usluge[0]
let kino = hotel.usluge[1]
admin.urediKorisnika(alma, 2, 'Dvokrevetna', teretana, (teretana) => {
  alma.usluge.push(teretana)
})

admin.urediKorisnickeUsluge(alma, kino, (kino) => alma.usluge.push(kino))
hotel.ispisKorisnika()
admin.izdajRacun(alma)
