import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Player, PlayerApi } from "./models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = "https://www.balldontlie.io/api/v1";
  constructor(private http: HttpClient) {}

  getPlayers(page: number = 0, search: string = ""): Observable<PlayerApi> {
    const url = `${this.baseUrl}/players?per_page=10&page=` + page + `&search=` + search;
    return this.http.get<PlayerApi>(url);
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.baseUrl}/players/` + id;
    return this.http.get<Player>(url);
  }
}
