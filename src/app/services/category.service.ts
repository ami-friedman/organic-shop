import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges()
    .pipe( switchMap( categories => {
      return categories.map( category => {
        return {key: category.key, ...category.payload.val()};
      });
    }));
  }
}
