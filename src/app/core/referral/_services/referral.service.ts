import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../token/token.service';


const API_URL = '/api/user/';

@Injectable({
  providedIn: 'root'
})

export class ReferralService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  private static keyGen(): string {
    const seed = new Date();
    return seed.getTime().toString(16).slice(0, 5).toUpperCase();
  }
  updateLink() {
    this.http.post(API_URL + 'update/referralLink', {link: ReferralService.keyGen()}, {headers: this.tokenService.getUserTokenHeader()});
  }
  getReferralList(): Observable<any> {
    return this.http.post<any>(API_URL + 'referral',
      {link: ReferralService.keyGen()},
      {headers: this.tokenService.getUserTokenHeader()
      });
  }

  getReferralStat(): Observable<any> {
    return this.http.post<any>(API_URL + 'stat',{},
      {headers: this.tokenService.getUserTokenHeader()});
  }

}
