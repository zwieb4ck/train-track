import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, Set, Split } from '../add/add.component';
import { StorageService } from '../../../services/storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-use',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './use.component.html',
  styleUrl: './use.component.scss',
})
export class UseComponent {
  public split: Split | null = null;
  public exercise: Exercise | null = null;
  public currentIndex = 0;
  public hasChanged = false;
  public aborting: boolean = false;
  public isDone: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.hasChanged = false;
      const splitId = params.get('id');
      const exerciseParam = params.get('exercise') || '0';
      this.currentIndex = parseInt(exerciseParam, 10);

      this.split = this.storageService
        .getData()
        .splits.find((s) => s.id === splitId) as Split;
      this.exercise = this.split.exercises[this.currentIndex];
    });
  }

  public addSet() {
    if (!this.exercise) return;
    this.exercise.sets.push({
      reps: 0,
      weight: 0,
      id: uuid(),
    });
    this.hasChanged = true;
  }

  public removeSetFromExercise(set: Set) {
    if (!this.exercise) return;
    const index = this.exercise.sets.findIndex((s) => s.id === set.id);
    if (index >= 0) {
      this.exercise.sets.splice(index, 1);
    }
    this.hasChanged = true;
  }

  public cancelTraining() {
    this.aborting = true;
  }

  public cancel() {
    this.aborting = false;
  }

  public stopTraining() {
    this.router.navigate(['dashboard']);
  }

  public finishTraining() {
    this.router.navigate(['dashboard']);
  }

  public enableUpdate() {
    this.hasChanged = true;
  }

  public save() {
    if (!this.split || this.exercise === null) return;
    this.split.exercises[this.currentIndex] = this.exercise;
    const config = this.storageService.getData();
    const oldIndex = config.splits.findIndex(
      (s: any) => s.id === this.split!.id
    );
    config.splits[oldIndex] = this.split;
    this.storageService.saveData(config);
    this.hasChanged = false;
  }

  public goPrev() {
    this.router.navigate([
      'split',
      'use',
      this.split!.id,
      this.currentIndex - 1,
    ]);
  }

  public goNext() {
    const nextIndex = this.currentIndex + 1;
    if (this.split?.exercises[nextIndex]) {
      this.router.navigate(['split', 'use', this.split!.id, nextIndex]);
    } else {
      this.isDone = true;
    }
  }
}
