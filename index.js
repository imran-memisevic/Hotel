class Hotel {
  constructor(naziv, adresa, maxBrojSoba) {
    this.naziv = naziv
    this.adresa = adresa
    this.maxBrojSoba = maxBrojSoba
    this.korisnici = new Map()
    this.sobe = new Map()
    this.usluge = new Map()
    this.aktivniKorisnici = new Map()
    this.rezervacije = new Map()
    this.statusSistema = true
  }

  // Metoda koja kreira i dodaje sobe u hotel
  dodajSobe(broj, tip, cijena) {
    if (this.statusSistema) {
      let soba = new Soba(broj, tip, cijena)
      this.sobe.set(broj, soba)
      return this.sobe.get(broj)
    } else {
      console.log('Sistem nije aktivan, nije moguće dodavati sobe.')
      return null
    }
  }

  // Dodaje usluge u hotel koje se mogu odabrati
  dodajUslugu(tip, cijenaPoDanu) {
    if (this.statusSistema) {
      let usluga = new Usluga(tip, cijenaPoDanu)
      this.usluge.set(tip, usluga)
    } else {
      console.log('Sistem nije aktivan, nije moguće dodati usluge.')
    }
  }
  //Ispis svih soba u hotelu
  ispisSoba() {
    if (this.statusSistema) {
      this.sobe.forEach((soba) => console.log(soba))
    } else {
      console.log('Nije moguće ispisati sobe, sistem nije aktivan.')
    }
  }
  //Ispis svih usluga hotela
  ispisUsluga() {
    if (this.statusSistema) {
      this.usluge.forEach((usluga) => console.log(usluga))
    } else {
      console.log('Nije moguće ispisati usluge, sistem nije aktivan.')
    }
  }
  //Ispis svih korisnika sistema
  ispisKorisnika() {
    if (this.statusSistema) {
      this.korisnici.forEach((korisnik) => console.log(korisnik))
    } else {
      console.log('Nije moguce ispisati korisnike, sistem nije aktivan')
    }
  }
  //Aktiviranje sistema
  aktiviranjeSistema() {
    if (this.statusSistema) {
      console.log('Sistem je već aktivan.')
    } else {
      this.statusSistema = true
      console.log('Sistem je aktiviran.')
    }
  }
}

class Soba {
  constructor(broj, tip, cijena) {
    this.broj = broj
    this.tip = tip
    this.cijena = cijena
    this.dostupnost = true
  }

  oslobodi() {
    if (this.dostupnost) {
      console.log('Soba je vec dostupna')
    } else {
      this.dostupnost = true
      console.log('Soba je oslobodjena')
    }
  }

  rezervisi() {
    if (!this.dostupnost) {
      console.log('Soba je vec rezervisana')
    } else {
      this.dostupnost = false
      console.log('Soba je rezervisana')
    }
  }
}

class Usluga {
  brojKoristenja
  constructor(tip, cijenaPoDanu) {
    this.tip = tip
    this.cijenaPoDanu = cijenaPoDanu
  }
}

class Admin {
  constructor(ime) {
    this.ime = ime
  }
  //Registrovanje korisnika u sistem
  registracijaKorisnika(
    ime,
    prezime,
    spol,
    brojLicneKarte,
    godine,
    brojSobe,
    tipSobe,
    korisnickoIme,
    lozinka,
    soba,
    hotel
  ) {
    if (hotel.korisnici.has(korisnickoIme)) {
      console.log('Korisničko ime već postoji. Molimo izaberite drugo.')
      return null
    }

    if (hotel.sobe.has(brojSobe)) {
      let soba = hotel.sobe.get(brojSobe)
      if (!soba.dostupnost) {
        console.log('Soba je već zauzeta. Molimo izaberite drugu sobu.')
        return null
      }
    }
    let korisnik = new Korisnik(
      ime,
      prezime,
      spol,
      brojLicneKarte,
      godine,
      brojSobe,
      tipSobe,
      korisnickoIme,
      lozinka,
      soba
    )

    hotel.korisnici.set(brojLicneKarte, korisnik)
    hotel.sobe.get(brojSobe).rezervisi()
    console.log(`Korisnik ${ime} ${prezime} uspješno registrovan.`)
    return korisnik
  }

  prijavaKorisnika(hotel, brojLicneKarte) {
    if (hotel.korisnici.has(brojLicneKarte)) {
      let korisnik = hotel.korisnici.get(brojLicneKarte)
      hotel.aktivniKorisnici.set(brojLicneKarte, korisnik)
      console.log(`Korisnik ${korisnik.ime} ${korisnik.prezime} je prijavljen.`)
    } else {
      console.log('Korisnik nije pronađen.')
    }
  }
  //Uredjivanje korisnika
  urediKorisnika(korisnik, brojSobe, tipSobe, soba, akcija, imeUsluge, hotel) {
    korisnik.brojSobe = brojSobe
    korisnik.tipSobe = tipSobe
    let staraSoba = korisnik.soba
    let novaSoba = soba
    staraSoba.oslobodi()
    novaSoba.rezervisi()
    korisnik.soba = novaSoba
    if (akcija === 'dodaj') {
      korisnik.naruciUslugu(imeUsluge, hotel)
    } else if (akcija === 'obrisi') {
      korisnik.usluge.delete(imeUsluge)
    } else {
      console.log('Nepravilan unos kacije')
    }
  }
  //Brisanje korisnika iz sistema
  odjaviKorisnika(hotel, brojLicneKarte) {
    let korisnik = hotel.korisnici.get(brojLicneKarte)
    let soba = hotel.sobe.get(korisnik.brojSobe)
    hotel.korisnici.delete(brojLicneKarte)
    korisnik.odjaviSe()
    soba.oslobodi()
    console.log(`Korisnik obrisan`)
  }
  //Izloguj aktivnog korisnika
  izlogujKorisnika(hotel, brojLicneKarte) {
    hotel.aktivniKorisnici.delete(brojLicneKarte)
    console.log('korisnik izlogovan')
  }

  izlogujSveKorisnike(hotel) {
    hotel.aktivniKorisnici.clear()
    console.log('Svi korisnici su izlogovani')
  }
  //Gasenje sistema i izlogovanje korisnika
  gasenjeSistema(hotel) {
    if (hotel.statusSistema) {
      hotel.statusSistema = false
      hotel.aktivniKorisnici.clear()
      console.log('Sistem je ugasen')
    } else if (!hotel.statusSistema) {
      console.log('Sistem je već ugašen.')
      return
    }
  }
  provjeraAktivnihKorisnika(hotel) {
    console.log(hotel.aktivniKorisnici)
  }

  pretraziKorisnika(hotel, brojLicneKarte) {
    if (hotel.korisnici.has(brojLicneKarte)) {
      const korisnik = hotel.korisnici.get(brojLicneKarte)
      console.log('Korisnik pronadjen:', korisnik)

      return korisnik
    } else {
      console.log('Korisnik nije pronadjen')
      return null
    }
  }

  izdajRacun(korisnik) {
    let ukupnoDugovanje = 0

    // Izračunavanje duga za boravak u sobi
    let dugZaSobu = korisnik.daniBoravka * korisnik.soba.cijena
    ukupnoDugovanje += dugZaSobu

    // Dodavanje duga za usluge
    korisnik.usluge.forEach((usluga) => {
      ukupnoDugovanje += usluga.cijenaPoDanu * usluga.brojKoristenja
    })

    // ADodavanje duga u objekat korisnika
    korisnik.dug = ukupnoDugovanje

    // Ispis računa
    console.log(`Račun za korisnika: ${korisnik.ime} ${korisnik.prezime}`)
    console.log(`_____________________________________________`)
    console.log(
      `Dug za sobu: ${dugZaSobu} KM (${korisnik.soba.cijena} KM/dan x ${korisnik.daniBoravka})`
    )

    console.log(`Usluge:`)
    korisnik.usluge.forEach((usluga) => {
      const dugZaUslugu = usluga.cijenaPoDanu * usluga.brojKoristenja
      console.log(
        `${usluga.tip}: ${dugZaUslugu} KM (${usluga.cijenaPoDanu} KM/dan x ${usluga.brojKoristenja} dana)`
      )
    })

    console.log(`_____________________________________________`)
    console.log(`Ukupno dugovanje: ${ukupnoDugovanje} KM`)
  }
}

class Korisnik {
  #brojLicneKarte
  #korisnickoIme
  #lozinka
  usluge = new Map()
  daniBoravka

  constructor(
    ime,
    prezime,
    spol,
    brojLicneKarte,
    godine,
    brojSobe,
    tipSobe,
    korisnickoIme,
    lozinka,
    soba
  ) {
    this.ime = ime
    this.prezime = prezime
    this.spol = spol
    this.#brojLicneKarte = brojLicneKarte
    this.godine = godine
    this.brojSobe = brojSobe
    this.tipSobe = tipSobe
    this.#korisnickoIme = korisnickoIme
    this.#lozinka = lozinka
    this.soba = soba
    this.dug = 0
    this.daniBoravka = 1
  }

  provjeriDug() {
    console.log(`Trenutni dug je: ${this.dug}KM`)
  }

  naruciUslugu(imeUsluge, hotel) {
    if (hotel.usluge.has(imeUsluge)) {
      let narucenaUsluga = hotel.usluge.get(imeUsluge)
      this.usluge.set(imeUsluge, narucenaUsluga)
      narucenaUsluga.brojKoristenja = 0
    } else {
      console.log('Usluga ne postoji u hotelu')
    }

    console.log(`Usluga ${imeUsluge} uspješno dodana`)
  }

  koristiUslugu(nazivUsluge) {
    if (this.usluge.has(nazivUsluge)) {
      this.usluge.get(nazivUsluge).brojKoristenja++
      console.log(
        `Usluga "${nazivUsluge}" je korišćena. Ukupan broj korišćenja: ${
          this.usluge.get(nazivUsluge).brojKoristenja
        }`
      )
    } else {
      console.log(
        `Usluga "${nazivUsluge}" nije dodata. Molimo vas da je prvo dodate.`
      )
    }
  }
  trenutneUsluge() {
    console.log(`Usluge koje se trenutno koriste su: `)
    this.usluge.forEach((usluga) => {
      console.log(`${usluga.tip}: ${usluga.cijenaPoDanu} KM`)
    })
  } //clg usluge koje se koriste

  promjeniSobu(noviBrojSobe, hotel) {
    if (!hotel.sobe.has(noviBrojSobe)) {
      console.log('Neispravan broj sobe. Molimo izaberite validnu sobu.')
      return false
    }
    let novaSoba = hotel.sobe.get(noviBrojSobe)
    let staraSoba = hotel.sobe.get(this.brojSobe)
    if (!novaSoba.dostupnost) {
      console.log(
        `Soba ${noviBrojSobe} nije dostupna. Molimo izaberite drugu sobu.`
      )
      return false
    } else {
      this.brojSobe = novaSoba.broj
      this.tipSobe = novaSoba.tipSobe
      this.soba = novaSoba
      novaSoba.rezervisi()
      staraSoba.oslobodi()
      return true
    }
  }

  odjaviSe() {
    this.soba = null
    this.usluge = new Map()
    this.dug = 0
    console.log(`${this.ime} se odjavio/la iz hotela.`)
  }
  produziDanBoravka() {
    this.daniBoravka++
  }
} //true/false za sobe?

module.exports = { Hotel, Soba, Usluga, Admin, Korisnik }
