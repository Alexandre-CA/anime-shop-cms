export class Product {
    description?:string 
    id?:string 
    image?:string 
    name?:string 
    strPrice?:string = "0,00" 
    price?:number 
    promotion?:string 
    status?:number = 1
    categories?:Category[] = []
    constructor(config?: any) {
        if (config) {
            this.id = (config.id !== undefined && config.id !== null) ? config.id : this.id;
            this.name = (config.name !== undefined && config.name !== null) ? config.name : this.name;
            this.image = (config.image !== undefined && config.image !== null) ? config.image : this.image;
            this.price = (config.price !== undefined && config.price !== null) ? config.price : this.price;
            this.strPrice = (config.price !== undefined && config.price !== null) ? this.decimalFormatter.format(config.price) : this.strPrice;
            this.promotion = (config.promotion !== undefined && config.promotion !== null) ? config.promotion?.toString() : this.promotion;
            this.status = (config.status !== undefined && config.status !== null) ? config.status : this.status;
            this.description = (config.description !== undefined && config.description !== null) ? config.description : this.description;
            this.categories = (config.categories !== undefined && config.categories !== null) ? config.categories.map((ct:any)=>{return ct.id}) : this.categories;
        }
    }
    private decimalFormatter: any = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    public get getStrPrice(): string {
        return (this.price !== undefined) ? this.decimalFormatter.format(this.price) : '0,00';
    }
}
export class Category {
    description?:string 
    id?:string 
    name?:string 
    status?:number = 1
    constructor(config?: any) {
        if (config) {
            this.id = (config.id !== undefined && config.id !== null) ? config.id : this.id;
            this.name = (config.name !== undefined && config.name !== null) ? config.name : this.name;
            this.status = (config.status !== undefined && config.status !== null) ? config.status : this.status;
            this.description = (config.description !== undefined && config.description !== null) ? config.description : this.description;
        }
    }
}