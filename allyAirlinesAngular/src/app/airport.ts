export class Airport {
    name: string;
    country: string;
    public id: number;

    constructor(name: string, country: string, id: number) {
        this.name = name;
        this.country = country;
        this.id = id;
    }
}
