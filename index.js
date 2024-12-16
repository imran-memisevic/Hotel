
class Korisnik {
  constructor(ime, dug = 0){
      this.ime = ime;
      this.dug = dug;
      this.usluge = [];
      this.soba = null;
      this.cijenaUsluge = {
          "Teretana" : 10,
          "Kino" : 10,
          "Restoran" : 20,
          "Bazen" : 10,
          "Sauna" : 10,
      };
  }
  provjeriDug(){console.log(`Trenutni dug je: ${this.dug}KM`)}
  naruciUslugu(imeUsluge){
      this.usluge.push(imeUsluge);
      this.dug += cijenaUsluge[imeUsluge];
      console.log(`Usluga ${imeUsluge} uspješno dodana`)
  }
   //dodaj uslugu
  trenutneUsluge(){
      console.log(`Usluge koje se trenutno koriste su: ${this.usluge.join(`, `)}`)
  } //clg usluge koje se koriste
  uslugeCijenaPoDanu(){
      console.log("Teretana: 10 KM")
      console.log("Kino: 10 KM")
      console.log("Restoran: 20 KM")
      console.log("Bazen: 10 KM")
      console.log("Sauna: 10 KM")
  } //clg usluge 
  
  promjeniSobu(tipSobe){
      const dostupneSobe = ["Jednokrevetna", "Dvokrevetna", "Apartman"];
      if (dostupneSobe.includes(tipSobe)) {
          this.soba = tipSobe;
          console.log(`${tipSobe} uspješno izabran/a.`)
      }
      else {
          console.log(`Neispravan tip sobe. Molimo izaberite jednu od ponuđenih opcija: ${tipSobe.join(`, `)}.`)
      }
  } //true/false za sobe?
  odjaviSe(){
      this.soba = null;
      this.usluge = [];
      this.debt = 0;
      console.log(`${ime} se odjavio/la iz hotela.`)
  } //logOut
}

/*jednokrevetna soba 20 KM
dvokrevetna soba 40 KM
apartman 60 KM
Teretana 10 KM
Kino 10 KM
Restoran 20 KM
Bazen 10 KM
Sauna 10 KM
*/