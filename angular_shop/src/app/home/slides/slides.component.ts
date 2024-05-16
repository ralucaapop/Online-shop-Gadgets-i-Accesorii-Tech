import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for common directives

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule], // Import CommonModule to use Angular common directives
  templateUrl: './slides.component.html',  // Ensure you have this template file in the correct path
  styleUrls: ['./slides.component.css']    // Ensure you have this CSS file in the correct path
})
export class SlidesComponent {
  slides = [
    { title: 'Slide 1', subtitle: 'Subtitlu Slide 1', content: 'Conținutul pentru Slide 1', image: 'https://img.freepik.com/premium-photo/display-electronic-devices-with-time-9-15_1078797-11664.jpg?w=1380' },
    { title: 'Slide 2', subtitle: 'Subtitlu Slide 2', content: 'Conținutul pentru Slide 2', image: 'url_to_image2.jpg' },
    // Continue adding other slides as needed
  ];
  currentIndex = 0;

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
