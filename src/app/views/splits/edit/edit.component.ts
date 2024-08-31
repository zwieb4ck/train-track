import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuid } from 'uuid';
import { colors } from '../../../utils/colors';
import { StorageService } from '../../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
export type Set = {
  reps: number;
  weight: number;
  id: string;
};

export class Exercise {
  public name: string = '';
  public device: string = '';
  public notes: string = '';
  public collapsed: boolean = false;

  constructor(public id: string, public sets: Set[] = []) {}

  static Adapt(savedExercise: any) {
    const exercise = new Exercise(savedExercise.id, savedExercise.sets);
    exercise.name = savedExercise.name;
    exercise.device = savedExercise.device;
    exercise.notes = savedExercise.notes;
    exercise.collapsed = savedExercise.collapsed;
    return exercise;
  }
}

export class Split {
  public name: string = '';
  public color: string = '';
  public id: string;
  public collapsed: boolean = false;
  public exercises: Exercise[] = [];

  constructor() {
    this.id = uuid();
  }

  static Adapt(savedSplit: any) {
    const split = new Split();
    split.name = savedSplit.name;
    split.color = savedSplit.color;
    split.id = savedSplit.id;
    split.collapsed = savedSplit.collapsed;
    split.exercises = savedSplit.exercises.map((e: any) => Exercise.Adapt(e));
    return split;
  }
}

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public exercises: Exercise[] = [];
  public split: Split = new Split();

  public colorControl = new FormControl('');
  public colors = colors;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const splitId = params.get('id');
      const res = this.storageService
        .getData()
        .splits.find((s: any) => s.id === splitId) as Split;
      this.split = res;
      this.exercises = res.exercises;
    });
  }

  ngOnInit(): void {
    console.log(this.storageService.getData());
  }

  public addForm() {
    this.exercises.push(
      new Exercise(uuid(), [{ reps: 0, weight: 0, id: uuid() }])
    );
  }

  public addSet(exercise: Exercise) {
    exercise.sets.push({
      reps: 0,
      weight: 0,
      id: uuid(),
    });
  }

  public removeSetFromExercise(set: Set, exercise: Exercise) {
    const index = exercise.sets.findIndex((s) => s.id === set.id);
    if (index >= 0) {
      exercise.sets.splice(index, 1);
    }
  }

  public clear(event: FocusEvent) {
    if (event.target) {
      (event.target as HTMLInputElement).value = '';
    }
  }

  public saveForms() {
    this.split.exercises = this.exercises;
    const config = this.storageService.getData();
    const oldIndex = config.splits.findIndex(
      (s: any) => s.id === this.split.id
    );
    config.splits[oldIndex] = this.split;
    this.storageService.saveData(config);
    this.router.navigate(['dashboard']);
  }

  public toggleExercise<T>(exercise: T & { collapsed: boolean }) {
    exercise.collapsed = !exercise.collapsed;
  }
}
