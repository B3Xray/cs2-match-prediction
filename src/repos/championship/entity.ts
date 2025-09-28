import { Team } from '../teams';
import { Stage } from '../../tools/predict_winner/prompt';

export type Standing = {
  team: Team;
  wins: number;
  losses: number;
};

export class Championship {
  constructor(public stage: Stage, public standings: Standing[]) {}
}