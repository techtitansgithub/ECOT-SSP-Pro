import { HttpClient, HttpHeaders, HttpParams, HttpResponse,} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { ShopParams } from '../models/product';




@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }



  public getProduct (shopParams: ShopParams, currentPage: number, pageSize: number){
      let params = new HttpParams();


    let route = `api/products`;

    params = params.append('PageNumber', currentPage);
    params = params.append('PageSize', pageSize!);

    if (shopParams.minPrice) {
      params = params.append('MinPrice', shopParams.minPrice);
    }

    if (shopParams.maxPrice) {
      params = params.append('MaxPrice', shopParams.maxPrice);
    }


    if (shopParams.category) {
      params = params.append('Category', shopParams.category);
    }

    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), { observe: 'response', params });


  }


  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}
