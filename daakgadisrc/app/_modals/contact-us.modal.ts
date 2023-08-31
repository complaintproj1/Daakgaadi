export class ContactUs{
    _id: string;
    customerId: string;
    customerName: string;
    timestamp: string;
    customerEmail: string;
    customerAddress: string;
    message: string;
    lastActionDate: string;
    currentStatus: string;

    constructor(contact) {
        this._id = contact._id;
        this.customerId = contact.customerId;
        this.customerName = contact.customerName;
        this.timestamp = contact.timestamp;
        this.customerEmail = contact.customerEmail;
        this.customerAddress = contact.customerAddress;
        this.message = contact.message;
        this.lastActionDate = contact.lastActionDate;
        this.currentStatus = contact.currentStatus;
    }
}