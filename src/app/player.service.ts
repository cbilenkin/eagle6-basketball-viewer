import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Player, PlayerAdapter } from "./player.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = "https://www.balldontlie.io/api/v1";
  constructor(private http: HttpClient, private adapter: PlayerAdapter) {}

  list(): Observable<Player[]> {
    const url = `${this.baseUrl}/players?per_page=100`;
    return this.http.get(url).pipe(
      map((returnedInfo: any) => returnedInfo.data.map(item => this.adapter.adapt(item)))
    );
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.baseUrl}/players/` + id;
    return this.http.get(url).pipe(
      map((returnedInfo: any) => this.adapter.adapt(returnedInfo))
    );
  }

  getSeasonAvg(id: number): Observable<Player> {
    const url = `${this.baseUrl}/season_averages?season=2019&player_ids[]=` + id;
    return this.http.get(url).pipe(
      map((returnedInfo: any) => returnedInfo.data.map(item => this.adapter.adapt(item)))
    );
  }
}
