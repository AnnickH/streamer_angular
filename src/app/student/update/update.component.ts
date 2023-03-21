import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _service: StudentService
  ) {}

  ngOnInit(): void {
    console.log(this._route.snapshot.paramMap.get('id'));
  }
}
