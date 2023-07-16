import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'funCooking';
  isLogin: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
        this.cdr.detectChanges(); // Dispara la detección de cambios
      // }
    });
  }
}
