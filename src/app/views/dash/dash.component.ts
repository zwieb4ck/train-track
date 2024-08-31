import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Split } from '../splits/add/add.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [MatDatepickerModule, MatIconModule, CommonModule],
  templateUrl: './dash.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './dash.component.scss',
})
export class DashComponent implements OnInit {
  public datePickerCollapsed: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private ref: ElementRef
  ) {
    this.datePickerCollapsed =
      this.storageService.getData().appConfig.datePickerCollapsed;
  }

  // Beispielhafte Liste von Daten, die hervorgehoben werden sollen
  datesToHighlight: Date[] = [
    new Date(2024, 7, 29),
    new Date(2024, 7, 15),
    new Date(2024, 7, 20),
  ];

  // Funktion, um CSS-Klasse für bestimmte Daten zurückzugeben
  dateClass = (date: Date): string => {
    const highlightDate = this.datesToHighlight.some(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
    );
    return highlightDate ? 'highlight-date' : '';
  };

  public splits: Split[] = [];

  public ngOnInit(): void {
    this.splits = this.storageService.getData().splits;
  }

  public addSplit() {
    this.router.navigate(['split/add']);
  }

  public edit(split: Split) {
    this.router.navigate(['split', 'edit', split.id]);
  }

  public toggleDatePicker() {
    this.datePickerCollapsed = !this.datePickerCollapsed;
    const config = this.storageService.getData();
    config.appConfig.datePickerCollapsed = this.datePickerCollapsed;
    this.storageService.saveData(config);
  }

  public editSplit(split: Split) {}
  public deleteSplitItem: Split | null = null;

  public get dialog() {
    return document.querySelector('.c-dialog') as HTMLDialogElement;
  }

  public deleteSplit(split: Split | null) {
    this.deleteSplitItem = split;
  }

  public removeSplit() {
    if (this.deleteSplitItem !== null) {
      const oldConfig = this.storageService.getData();
      const index = oldConfig.splits.findIndex(
        (s) => s.id === this.deleteSplitItem!.id
      );
      if (index >= 0) {
        oldConfig.splits.splice(index, 1);
        this.storageService.saveData(oldConfig);
        this.deleteSplit(null);
      }
    }
    this.splits = this.storageService.getData().splits;
  }

  public Goto(split: Split) {
    this.router.navigate(['split', 'use', split.id, 0]);
  }
}
