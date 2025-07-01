import { API_CONFIG } from "./config";
import type { Coordinates, ForecastData, WeatherData, GeocodingResponse } from "./types";

class WeatherAPI{
    private createURL(endpoint: string, params: Record<string, string|number>){
        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        })

        return `${endpoint}/${searchParams.toString()}`;
    }

    private async fethData<T>(url:string):Promise<T>{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Weather API error: ${response.statusText}`)
        }

        return response.json();

    }
    
    async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
        const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit:1,
        });

        return this.fethData<WeatherData>(url);
    }

    async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
        const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        return this.fethData<ForecastData>(url);
    }

    async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createURL(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        return this.fethData<GeocodingResponse[]>(url);
    }
}

export const weatherAPI = new WeatherAPI();