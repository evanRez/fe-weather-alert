
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

export type {weatherLocation, iNinjaCity}