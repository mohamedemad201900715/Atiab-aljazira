import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-gallery',
  imports: [TranslatePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  protected readonly shipmentImages = [
    '/images/ship-1.jpeg',
    '/images/ship-2.jpeg',
    '/images/ship-3.jpeg',
    '/images/ship-4.jpeg',
    '/images/ship-5.jpeg',
    '/images/ship-6.jpeg'
  ];
}
