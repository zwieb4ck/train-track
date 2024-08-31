import { Component, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#6ab04c',
      contrastText: '#dfe6e9',
    },
    secondary: {
      main: '#dff9fb',
    },
    background: {
      default: '#2d3436',
      paper: '#2d3436',
    },
    text: {
      primary: '#dfe6e9',
      secondary: '#dfe6e9',
      disabled: 'rgba(223,230,233,0.4)',
      hint: 'rgba(223,230,233,0.7)',
    },
  },
};


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDatepickerModule],
  templateUrl: './app.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fitness-app';
  theme = themeOptions;
  selected = model<Date | null>(null);
}
