import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges()
    .pipe(map( categories => {
      return categories.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }));
  }
}
