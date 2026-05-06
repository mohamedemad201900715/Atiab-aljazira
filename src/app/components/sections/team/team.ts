import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-team',
  imports: [TranslatePipe],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {}
