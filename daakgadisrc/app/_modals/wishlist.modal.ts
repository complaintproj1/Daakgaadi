export class Wishlist{
    _id: string;
    pid: string;
    cid: string;

    constructor(wishlist){
        this._id = wishlist._id;
        this.pid = wishlist.pid;
        this.cid = wishlist.cid;
    }
}