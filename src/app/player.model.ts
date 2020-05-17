import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class Player {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public position: string,
        public height_ft: number,
        public height_in: number,
        public weight: number,
        public team_name: string,
        public team_abbr: string,
        public team_city: string,
        public team_conf: string,
        public team_div: string,
        public team_full_name: string
    ) {}
}

@Injectable({
  providedIn: "root"
})
export class PlayerAdapter implements Adapter<Player> {
  adapt(item: any): Player {
    return new Player(
        item.id,
        item.first_name,
        item.last_name,
        item.position,
        item.height_feet,
        item.height_inches,
        item.weight_pounds,
        item.team.name,
        item.team.abbreviation,
        item.team.city,
        item.team.conference,
        item.team.division,
        item.team.full_name
    );
  }
}