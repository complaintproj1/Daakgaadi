export class Products {
  _id: string;
  pname: string;
  poffer: string;
  pcat: string;
  psub: string;
  pphoto: string;
  dprice: number;
  aprice: number;
  pdes: string;
  qty: number;
  quantity: number;
  saving: number;
  total: number;
  moi : string;
  dust: string;
  gcv:string;
  pictures: string[];
  vid: string;
  stars: string[];
  reviews: string[];
  Combo: [{ name: string; des: string; aprice: number; dprice: number }];

  constructor(product) {
    this._id = product._id;
    this.pname = product.pname;
    this.poffer = product.poffer;
    this.pcat = product.pcat;
    this.psub = product.psub;
    this.pphoto = product.pphoto;
    this.dprice = product.dprice;
    this.aprice = product.pname;
    this.pdes = product.pdes;
    this.saving = product.saving;
    this.total = product.total;
    this.moi= product.moi;
    this.gcv= product.gcv;
    this.dust= product.dust;
  this.vid = product.vid;
    this.qty = product.qty || null;
    this.quantity = product.quantity || null;
    this.pictures = product.pictures || [];
    this.stars = product.stars || [];
    this.reviews = product.reviews || [];
    this.Combo = product.Combo || [];
  }
}
