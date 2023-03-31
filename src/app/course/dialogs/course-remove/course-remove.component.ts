import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { CourseListType } from '../../types/course-list-type';
import { CourseType } from '../../types/course-type';

@Component({
  selector: 'app-course-remove',
  templateUrl: './course-remove.component.html',
  styleUrls: ['./course-remove.component.scss'],
})
export class CourseRemoveComponent implements OnInit {
  public okButtonLabel: string = 'Confirm';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CourseType,
    private router: Router,
    public dialogRef: MatDialogRef<CourseRemoveComponent>
  ) {}
  // va chercher la data définir dans matDialog, injection de dépandance, injection des parents
  ngOnInit(): void {
    console.log(this.data);
  }
  public onClick(): void {
    this.dialogRef.close();
    console.log('c est clique');
    // this.router.navigate(['/course/list']);
  }

  public onDelete(): void {
    this.dialogRef.close(); //ferme le dialog et [mat-dialog-close]="data" permet de récupérer la donnée
    console.log('You want delete course : ' + this.data.title);
    // this.router.navigate(['/course/list']);
  }
}
