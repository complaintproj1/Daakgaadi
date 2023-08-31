export class Category{
    _id: string;
    name: string;
    image: string;
    subcategories: [
        { sid: string, name: string }
    ];

    constructor(category){
        this._id = category._id;
        this.name = category.name;
        this.image = category.image;
        this.subcategories = category.subcategories || [];
    }
}