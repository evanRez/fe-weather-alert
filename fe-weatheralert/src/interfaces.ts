
 interface weatherLocation {
    'lat': number,
    'long': number,
    'formattedAddress': string,
    'weatherDesc': string,
    'temp': number,
    'high': number,
    'low':  number,
    'icon': string
}



interface weatherCity {
    name: string,
    local_names: any,
    lat: number,
    lon: number,
    country: string,
    state: string,
    readonly full_name: string
 }


class weatherCityClass implements weatherCity {
    constructor(public name: string, public local_names: any,
         public lat: number, public lon: number, public country: string, public state: string) {}
    get full_name(): string {
        return `${this.name}, ${this.state}, ${this.country}`
    }
}


export type {weatherLocation, weatherCity, weatherCityClass}