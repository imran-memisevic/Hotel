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
