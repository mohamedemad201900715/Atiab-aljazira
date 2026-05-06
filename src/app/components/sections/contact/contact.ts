import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {}
