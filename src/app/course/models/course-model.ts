export class CourseModel {
  private _id?: number;
  private _title: string = '';
  private _created_at?: string = '';
  private _updated_at?: string = '';
  private _objective?: string = '';

  get id() {
    return this._id === undefined ? 0 : this._id;
  }

  set id(val: number) {
    this._id = val;
  }

  get title() {
    return this._title;
  }

  set title(val: string) {
    this._title = val;
  }

  get created_at() {
    return this._created_at === undefined ? '' : this._created_at;
  }

  set created_at(val: string) {
    this._created_at = val;
  }

  get updated_at() {
    return this._updated_at === undefined ? '' : this._updated_at;
  }

  set updated_at(val: string) {
    this._updated_at = val;
  }

  get objective() {
    return this._objective === undefined ? '' : this._objective;
  }

  set objective(val: string) {
    this._objective = val;
  }
}
