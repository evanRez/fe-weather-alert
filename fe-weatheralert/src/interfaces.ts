
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


interface iNinjaCity {
    'country': string,
    'is_capital': boolean,
    'latitude': number,
    'longitude': number,
    'name': string,
    'population': number
}

interface usCity {
    "city": string,
    "city_ascii": string,
    "state_id": string,
    "state_name": string,
    "county_fips": number,
    "county_name": string,
    "lat": number,
    "lng": number,
    "population": number,
    "density": number,
    "source": string,
    "military": boolean,
    "incorporated": boolean,
    "timezone": string,
    "ranking": number,
    "zips": string,
    "id": number
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


export type {weatherLocation, iNinjaCity, usCity, weatherCity, weatherCityClass}