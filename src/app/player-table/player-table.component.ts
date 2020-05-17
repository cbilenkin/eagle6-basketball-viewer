import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Player } from "../player.model";
import { PlayerService } from "../player.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})

export class PlayerTableComponent implements OnInit {
  players: Player[];
  displayedColumns: string[] = ['first_name', 'last_name', 'position', 'team', 'height', 'weight'];
  dataSource = new MatTableDataSource<Player>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private playerService: PlayerService) {
    this.players = [];
    this.dataSource = new MatTableDataSource(this.players);
  }

  selectedPlayer: Player;
  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  ngOnInit() {
    this.playerService.list().subscribe((players: Player[]) => {
      this.dataSource.data = players;
      this.players = players;
    });
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
