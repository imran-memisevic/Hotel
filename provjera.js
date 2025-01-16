const { Hotel, Soba, Usluga, Admin, Korisnik } = require('./index.js')

let hotel = new Hotel({
  adresa: 'Tuzla',
  maxBrojSoba: 100,
  naziv: 'Melain',
})

let soba101 = hotel.dodajSobe(101, 'Jednokrevetna', 50)
let soba102 = hotel.dodajSobe(102, 'Dvokrevetna', 100)

hotel.dodajUslugu('Teretana', 10)
hotel.dodajUslugu('Kino', 20)
hotel.dodajUslugu('Bazen', 30)

const admin = new Admin('Emina')
let emina = admin.registracijaKorisnika(
  'Emina',
  'Mumic',
  'Ž',
  'OK123',
  21,
  101,
  'Jednokrevetna',
  'emina',
  '123',
  soba101,
  hotel
)

emina.naruciUslugu('Teretana', hotel)
emina.koristiUslugu('Teretana')
emina.naruciUslugu('Kino', hotel)
emina.produziDanBoravka()

admin.izdajRacun(emina)
admin.prijavaKorisnika(hotel, 'OK123')
admin.provjeraAktivnihKorisnika(hotel)
admin.izlogujKorisnika(hotel, 'OK123')
admin.provjeraAktivnihKorisnika(hotel)
