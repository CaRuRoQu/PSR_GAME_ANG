import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

interface GamedataArray {
  id: BigInteger;
  name: string;
  level: number;
  highScore: number;
  playedOn:string;
  
}

interface GamedataUpdate {

  name: string;
  level: number;
  highScore: number;
  playedOn:string;
  
}


@Injectable({
  providedIn: 'root'
})


export class GamedataService {

  private readonly API_URL_Add = 'http://localhost:8080/game-records/add';
  private readonly API_URL_All = 'http://localhost:8080/game-records/all';

  constructor(private http: HttpClient) { }

  addGameRecord(gameRecord: GamedataUpdate){
    return this.http.post(this.API_URL_Add, gameRecord);
  }
  
  getAllGameRecords():Observable<GamedataArray[]> {
    return this.http.get<GamedataArray[]>(this.API_URL_All);
  }  
}