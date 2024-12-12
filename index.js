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
    let soba = new Soba(broj, tip, cijena)
    this.sobe.push(soba)
  }

  //Dodaje usluge u hotel koje se mogu odabrati
  dodajUslugu(tip, cijenaPoDanu) {
    let usluga = new Usluga(tip, cijenaPoDanu)
    this.usluge.push(usluga)
  }

  ispisSoba() {
    this.sobe.forEach((soba) => {
      console.log(soba)
    })
  }

  ispisUsluga() {
    this.usluge.forEach((usluga) => {
      console.log(usluga)
    })
  }

  //Metoda koja gasi sistem tj gasi hotel
  gasenjeSistema() {
    if (this.statusSistema === false) {
      console.log('Sistem je vec ugasen')
    }
    this.statusSistema = false
    console.log('Sistem je ugasen')
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
