import { Component, OnInit, Input } from '@angular/core';
import { Player } from "../player.model";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss']
})

export class SinglePlayerComponent implements OnInit {

  @Input() player: Player;
  @Input() seasonavg: Player;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlayer();
    this.getSeasonAvg();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  getSeasonAvg(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getSeasonAvg(id)
      .subscribe(seasonavg => this.seasonavg = seasonavg);
  }

  goBack(): void {
    this.location.back();
  }

}
