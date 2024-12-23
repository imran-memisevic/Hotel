const { Hotel, Soba, Usluga, Admin, Korisnik } = require('./index.js')

let hotel = new Hotel({
  adresa: 'Tuzla',
  maxBrojSoba: 100,
  naziv: 'Melain',
})

hotel.dodajSobe(101, 'Jednokrevetna', 50)
hotel.dodajSobe(102, 'Dvokrevetna', 100)
hotel.dodajSobe(103, 'Trokrevetna', 150)

hotel.dodajUslugu('Teretana', 10)
hotel.dodajUslugu('Kino', 20)

let soba101 = hotel.sobe.get(101)

const admin = new Admin('Emina')
admin.registracijaKorisnika(
  'Emina',
  'MUmic',
  'Ž',
  'OK123',
  21,
  101,
  'Jednolrevetna',
  new Date(),
  'emina',
  '123',
  soba101,
  hotel
)

const emina = hotel.korisnici.get('OK123')
emina.naruciUslugu('Teretana', hotel)
emina.koristiUslugu('Teretana')
emina.naruciUslugu('Kino', hotel)
emina.koristiUslugu('Kino')
emina.koristiUslugu('Kino')
emina.produziDanBoravka()
emina.produziDanBoravka()
admin.izdajRacun(emina)
