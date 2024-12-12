class Hotel {
  korisnici = []
  sobe = []
  usluge = []
  rezervacije = []
  statusSistema = true

  //Metoda koja kreira i dodaje sobe u hotel
  dodajSobe(brojSobe, tipSobe) {
    let soba = new Soba(brojSobe, tipSobe)
    this.sobe.push(soba)
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
  constructor(broj, tip) {
    this.broj = broj
    this.tip = tip
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

console.log('Nista')
