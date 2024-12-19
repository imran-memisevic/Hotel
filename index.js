class Hotel {
  constructor(naziv, adresa, maxBrojSoba) {
    this.naziv = naziv
    this.adresa = adresa
    this.maxBrojSoba = maxBrojSoba
    this.korisnici = new Map()
    this.sobe = new Map()
    this.aktivniKorisnici = new Map()
    this.usluge = []
    this.rezervacije = []
    this.statusSistema = true
  }

  // Metoda koja kreira i dodaje sobe u hotel
  dodajSobe(broj, tip, cijena, ID) {
    if (this.statusSistema) {
      let soba = new Soba(broj, tip, cijena)
      this.sobe.set(ID, soba)
    } else {
      console.log('Sistem nije aktivan, nije moguće dodavati sobe.')
    }
  }

  // Dodaje usluge u hotel koje se mogu odabrati
  dodajUslugu(tip, cijenaPoDanu) {
    if (this.statusSistema) {
      let usluga = new Usluga(tip, cijenaPoDanu)
      this.usluge.push(usluga)
    } else {
      console.log('Sistem nije aktivan, nije moguće dodati usluge.')
    }
  }

  ispisSoba() {
    if (this.statusSistema) {
      this.sobe.forEach((soba) => console.log(soba))
    } else {
      console.log('Nije moguće ispisati sobe, sistem nije aktivan.')
    }
  }

  ispisUsluga() {
    if (this.statusSistema) {
      this.usluge.forEach((usluga) => console.log(usluga))
    } else {
      console.log('Nije moguće ispisati usluge, sistem nije aktivan.')
    }
  }

  ispisKorisnika() {
    this.korisnici.forEach((korisnik, brojLicneKarte) => {
      console.log(`Broj lične: ${brojLicneKarte}`, korisnik)
    }
  )
  
  
  }

 

  aktiviranjeSistema() {
    if (this.statusSistema) {
      console.log('Sistem je već aktivan.')
      return
    }
    this.statusSistema = true
    console.log('Sistem je aktiviran.')
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
    this.dostupnost = true
  }

  rezervisi() {
    this.dostupnost = false
  }
}

class Usluga {
  constructor(tip, cijenaPoDanu) {
    this.tip = tip
    this.cijenaPoDanu = cijenaPoDanu
  }
}

class Admin {
  constructor(ime) {
    this.ime = ime
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
    if (hotel.korisnici.has(brojLicneKarte)) {
      console.log('Korisnik sa ovim brojem lične karte već postoji.')
      return
    }

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

    hotel.korisnici.set(brojLicneKarte, korisnik)
    console.log(`Korisnik ${ime} ${prezime} uspješno registrovan.`)
  }

  urediKorisnika(korisnik, brojSobe, tipSobe, usluga, callback) {
    korisnik.brojSobe = brojSobe
    korisnik.tipSobe = tipSobe
    callback(usluga)
  }
  odjavikorisnika(hotel,brojLicneKarte){
    hotel.korisnici.delete(brojLicneKarte);
  console.log('korisnik obrisan');
  }
  izlogujKorisnika(hotel,brojLicneKarte){
    hotel.aktivniKorisnici.delete(hotel,brojLicneKarte);
  }
  gasenjeSistema(hotel) {
    if(hotel.statusSistema == true){
      hotel.statusSistema = false;
      console.log('Sistem je ugasen');
      
    }
    else if (!hotel.statusSistema) {
      console.log('Sistem je već ugašen.')
      return
    } 
  }
  provjeraAktivnihKorisnika(hotel){
    console.log(hotel.aktivniKorisnici);
    
  }
 

  pretrazikorisnika(hotel, brojLicneKarte) {
   
    if (hotel.korisnici.has(brojLicneKarte)) {
        const korisnik = hotel.korisnici.get(brojLicneKarte);
        console.log("Korisnik pronadjen:", korisnik);
       
        return korisnik;
    } else {
        console.log("User not found.");
        return null;
    }
}

  urediKorisnickeUsluge(korisnik, usluga, callback) {
    callback(usluga)
  }

  izdajRacun(korisnik) {
    let racun = 0
    korisnik.usluge.forEach((usluga) => (racun += usluga.cijenaPoDanu))

    console.log(`Račun za ${korisnik.ime} ${korisnik.prezime}.
_____________________________________________
                 `)
    korisnik.usluge.forEach((usluga) => {
      console.log(`${usluga.tip}: ${usluga.cijenaPoDanu} KM`)
    })
    console.log(`_____________________________________________

 ${racun} KM`)
  }
}

class Korisnik {
  #brojLicneKarte
  #korisnickoIme
  #lozinka

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
    this.ime = ime
    this.prezime = prezime
    this.spol = spol
    this.#brojLicneKarte = brojLicneKarte
    this.godine = godine
    this.brojSobe = brojSobe
    this.tipSobe = tipSobe
    this.vrijemePrijaveUHotel = vrijemePrijaveUHotel
    this.#korisnickoIme = korisnickoIme
    this.#lozinka = lozinka
    this.usluge = []
  }

  provjeriDug() {
    console.log(`Trenutni dug je: ${this.dug}KM`)
  }
  naruciUslugu(imeUsluge) {
    this.usluge.push(imeUsluge)
    this.dug += cijenaUsluge[imeUsluge]
    console.log(`Usluga ${imeUsluge} uspješno dodana`)
  }
  //dodaj uslugu
  trenutneUsluge() {
    console.log(`Usluge koje se trenutno koriste su: ${this.usluge.join(`, `)}`)
  } //clg usluge koje se koriste
  uslugeCijenaPoDanu() {
    console.log('Teretana: 10 KM')
    console.log('Kino: 10 KM')
    console.log('Restoran: 20 KM')
    console.log('Bazen: 10 KM')
    console.log('Sauna: 10 KM')
  } //clg usluge

  promjeniSobu(tipSobe) {
    const dostupneSobe = ['Jednokrevetna', 'Dvokrevetna', 'Apartman']
    if (dostupneSobe.includes(tipSobe)) {
      this.soba = tipSobe
      console.log(`${tipSobe} uspješno izabran/a.`)
    } else {
      console.log(
        `Neispravan tip sobe. Molimo izaberite jednu od ponuđenih opcija: ${tipSobe.join(
          `, `
        )}.`
      )
    }
  } //true/false za sobe?
  odjaviSe() {
    this.soba = null
    this.usluge = []
    this.debt = 0
    console.log(`${ime} se odjavio/la iz hotela.`)
  }
}

// Testiranje programa
let hotel = new Hotel('Hotel Sunce', 'Kralja Tomislava 54, Neum', 100)
hotel.dodajSobe(1, 'Jednokrevetna', 20, '11')
hotel.dodajSobe(2, 'Dvokrevetna', 40, '12')
hotel.dodajSobe(3, 'Jednokrevetna', 20, '13')
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
  'Ž',
  '15OK043',
  18,
  1,
  'Jednokrevetna',
  '12.12.2024',
  'almica',
  'almica123',
  hotel
)
admin.registracijaKorisnika(
  'Almir',
  'Mumić',
  'M',
  '15OK042',
  18,
  1,
  'Jednokrevetna',
  '12.12.2024',
  'almir',
  'almir123',
  hotel
)

let alma = hotel.korisnici.get('15OK043')



let teretana = hotel.usluge[0]
let kino = hotel.usluge[1]

admin.urediKorisnika(alma, 2, 'Dvokrevetna', teretana, (usluga) => {
  alma.usluge.push(usluga)
})

admin.urediKorisnickeUsluge(alma, kino, (usluga) => alma.usluge.push(usluga))


admin.izdajRacun(alma)

console.log(hotel.sobe)


hotel.ispisKorisnika()
admin.pretrazikorisnika(hotel,'15OK043')