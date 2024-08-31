import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {

  constructor(private router: Router) {}

  public ngOnInit(): void {
    const logoAnimation = (window as any).anime.timeline({
      autoplay: true,
      delay: 500,
    });

    logoAnimation
      .add({
        targets: '#logo',
        translateY: [-100, 0],
        opacity: [0, 1],
        elasticity: 600,
        duration: 1600,
      })
      .add({
        targets: '#logo-hexagon',
        rotate: [-90, 0],
        duration: 1200,
        elasticity: 600,
        offset: 100,
      })
      .add({
        targets: '#logo-circle',
        scale: [0, 1],
        duration: 1200,
        elasticity: 600,
        offset: 500,
      })
      .add({
        targets: '#logo-mask',
        scale: [0, 1],
        duration: 1000,
        elasticity: 600,
        offset: 550,
      })
      .add({
        targets: '#logo-text',
        translateX: ['-100%', 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        offset: 1000,
      });
      setTimeout(()=>{
        this.router.navigate(["dashboard"]);
      }, 2800)
  }
}
