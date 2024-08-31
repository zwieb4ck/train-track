import { Injectable } from '@angular/core';
import { Split } from '../views/splits/add/add.component';

export type StartedTraining = {
  id: string;
  ts: number;
};

export type StorageData = {
  appConfig: {
    datePickerCollapsed: boolean;
  };
  splits: Split[];
  started: StartedTraining[];
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKey = 'appData';

  constructor() {}

  public getData(): StorageData {
    const storedData = window.localStorage.getItem(this.storageKey);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      parsed.splits = parsed.splits.map((s: any) => Split.Adapt(s));
      return parsed;
    } else {
      return {
        appConfig: {
          datePickerCollapsed: false,
        },
        splits: [],
        started: [],
      };
    }
  }

  public saveData(data: StorageData) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private validateData(appData: any) {}
}
