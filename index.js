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
    password
  ) {
    let korisnik = new Korisnik()
    korisnik.ime = ime
    korisnik.prezime = prezime
    korisnik.spol = spol
    korisnik.brojLicneKarte = brojLicneKarte
    korisnik.godine = godine
    korisnik.borjSobe = brojSobe
    korisnik.tipSobe = tipSobe
    korisnik.vrijemePrijaveUHotel = vrijemePrijaveUHotel
    korisnik.korisnickoIme = korisnickoIme
    korisnik.password = password
  }
}

let hotel = new Hotel('Hotel Sunce', 'Kralja Tomislava 54 88390 Neum', 100)
hotel.dodajSobe(1, 'Jednokrevetna', 20)
hotel.dodajSobe(2, 'Dvokrevetna', 40)
hotel.dodajSobe(3, 'Jednokrevetna', 20)
hotel.dodajUslugu('Teretana', 10)
hotel.dodajUslugu('Kino', 10)

hotel.ispisSoba()
hotel.ispisUsluga()
