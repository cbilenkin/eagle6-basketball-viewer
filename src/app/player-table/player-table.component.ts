import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Player } from "../models";
import { PlayerService } from "../player.service";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})

export class PlayerTableComponent implements AfterViewInit {
  displayedColumns = ['first_name', 'last_name', 'position', 'team', 'height', 'weight'];
  playerDatabase: PlayerService | null;
  players: Player[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private playerService: PlayerService) {
    this.players = [];
  }

  selectedPlayer: Player;
  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  ngAfterViewInit() {
    this.getResults();
  }

  getResults(search?: string) {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.playerService.getPlayers(this.paginator.pageIndex + 1, search);
        }),
        map(returnedInfo => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = returnedInfo.meta.total_count;

          return returnedInfo.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((players: Player[]) => {
        this.players = players;
      });
  }

  applyFilter(event: Event) {
    this.paginator.pageIndex = 0;
    const filterValue = (event.target as HTMLInputElement).value;
    this.getResults(filterValue);
  }
}
