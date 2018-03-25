import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions, URLSearchParams, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../../shared/global.service';
import { Country } from '../../model/Country';
import { City } from '../../model/City';
import { Weather3Hour } from '../../model/weatherHour';
import { Weather14Day } from '../../model/weatherDay';

/*
  Generated class for the LocalizationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class LocalizationProvider {
  headers: HttpHeaders;
  constructor(public http: HttpClient, public globalService: GlobalService) {
    console.log('Hello RestApiProvider Provider');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('tameteo:appli')
    });
  }

  getCountries(): Observable<Country[]> {
    const httpOptions = {
      headers: this.headers
    };
    return this.http.get(this.globalService.url.countries, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getCities(long: string, lat: string, country: string): Observable<City[]> {
    let params = new HttpParams();
    params = params.append('long', long);
    params = params.append('lat', lat);
    params = params.append('country', country);

    const httpOptions = {
      headers: this.headers,
      params: params
    };
    return this.http.get(this.globalService.url.localization, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  get3hours(cityid: string, country: string): Observable<Weather3Hour[]> {
    let params = new HttpParams();
    params = params.append('cityid', cityid);
    params = params.append('country', country);

    const httpOptions = {
      headers: this.headers,
      params: params
    };
    return this.http.get(this.globalService.url.weather_three_hours, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  get14days(cityid: string, country: string): Observable<Weather14Day[]> {
    let params = new HttpParams();
    params = params.append('cityid', cityid);
    params = params.append('country', country);

    const httpOptions = {
      headers: this.headers,
      params: params
    };
    return this.http.get(this.globalService.url.weather_forteen_days, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
