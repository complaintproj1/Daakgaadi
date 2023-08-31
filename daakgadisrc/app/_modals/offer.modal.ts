export class Offer {
  _id: string;
  adlink: string;
  addesc: string;
  tittle: string;

  constructor(offer) {
    this._id = offer._id;
    this.adlink = offer.adlink;
    this.addesc = offer.addesc;
    this.tittle = offer.tittle;
  }
}
