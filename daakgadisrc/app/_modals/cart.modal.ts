export class Cart{
    _id: string;
    pid: string;
    cid: string;
    quantity: number;

    constructor(cart){
        this._id = cart._id;
        this.pid = cart.pid;
        this.cid = cart.cid;
        this.quantity = cart._id;
    }
}