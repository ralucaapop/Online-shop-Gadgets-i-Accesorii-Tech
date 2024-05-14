import { CommonModule } from '@angular/common'; // Adaugă acest import dacă folosești directive comune cum ar fi *ngIf
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],  // Adaugă aici orice module necesare pentru template
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  imageUrl: string = '../../../assets/Banner.webp'; // Înlocuiește cu calea către imaginea ta
}
