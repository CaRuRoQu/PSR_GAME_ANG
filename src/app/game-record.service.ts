import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameRecordService {
  private readonly API_URL_Add = 'http://localhost:8080/game-records/add';
  private readonly API_URL_All = 'http://localhost:8080/game-records/all';

  constructor(private http: HttpClient) { }

  addGameRecord(gameRecord: any) {
    return this.http.post(this.API_URL_Add, gameRecord);
  }
  getAllGameRecords() {
    return this.http.get(this.API_URL_All);
  }
}