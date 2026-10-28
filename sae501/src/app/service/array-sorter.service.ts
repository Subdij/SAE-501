import { Injectable } from '@angular/core';
import { SorterData } from '../models/sorter-data';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArraySorterService {

  constructor() { }

  private activeKey$ = new BehaviorSubject<string | null>(null);
  private activeOrder$ = new BehaviorSubject<"increasing" | "decreasing">("increasing");

  activeArrow(activeArrow: SorterData, arrows: SorterData[], values: any[]){
    const currentIndex = this.getActiveArrow(arrows);

    if(activeArrow === arrows[currentIndex]){
      activeArrow.up = !activeArrow.up;
    } else {
      arrows[currentIndex].active = false;
      activeArrow.active = true;
      activeArrow.up = true;
    }

    const newIndex = this.getActiveArrow(arrows);
    const newActiveArrow = arrows[newIndex];
    this.activeKey$?.next(newActiveArrow.key ?? null);
    if(newActiveArrow.up){
      this.sorterByIncreasingOrder(values, newActiveArrow.key);
      this.activeOrder$.next("increasing");
    } else {
      this.sorterByDecreasingOrder(values, newActiveArrow.key);
      this.activeOrder$.next("decreasing");
    }
  }

  getActiveArrow(arrows: SorterData[]): number{
    let currentIndex = 0;
    arrows.forEach((arrow, index) => {
      if(arrow.active){
        currentIndex = index;
      }
    });
    return currentIndex;
  }

  sorterByIncreasingOrder(array: any[], key: string | undefined){
    array.sort((a, b) => {
      const keyA = a[key ?? ""].toString().toUpperCase();
      const keyB = b[key ?? ""].toString().toUpperCase();
      if( keyA < keyB ){
        return -1;
      }
      if(keyA > keyB){
        return 1;
      }
      return 0;  
    });
  }

  sorterByDecreasingOrder(array: any[], key: string | undefined){
    array.sort((a, b) => {
      const keyA = a[key ?? ""].toString().toUpperCase();
      const keyB = b[key ?? ""].toString().toUpperCase();
      if( keyA > keyB ){
        return -1;
      }
      if(keyB > keyA){
        return 1;
      }
      return 0;  
    });
  }

  firstSorting(arrows: SorterData[]){
    const currentIndex = this.getActiveArrow(arrows);
    const currentArrow = arrows[currentIndex];
    this.sorterByIncreasingOrder(arrows, currentArrow.key);
  }

  setDefaultActiveKey(activeKey: string){
    this.activeKey$.next(activeKey);
  }

  setDefaultOrder(){
    this.activeOrder$.next("increasing");
  }

  sortedArrayWithCurrentKeyAndOrder(array: any){
    const activeOrder = this.activeOrder$.value;
    const activeKey = this.activeKey$.value ?? "";
    console.log("key", activeKey);
    console.log("order", activeOrder);
    if(activeOrder === "increasing"){
      this.sorterByIncreasingOrder(array, activeKey);
    } else if (activeOrder === "decreasing"){
      this.sorterByDecreasingOrder(array, activeKey);
    }
  }
}
