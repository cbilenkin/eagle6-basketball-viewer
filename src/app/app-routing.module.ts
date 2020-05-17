import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerTableComponent } from './player-table/player-table.component';
import { SinglePlayerComponent } from './single-player/single-player.component';

const routes: Routes = [
  { path: '', component: PlayerTableComponent },
  { path: 'detail/:id', component: SinglePlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
