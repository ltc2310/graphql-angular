import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/course.model';
import { CourseService } from 'src/app/shared/course.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];

  constructor(
    private service: CourseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const result = this.service.getCourseList();
    // tslint:disable-next-line:no-shadowed-variable
    result.subscribe((result) => {
      if (result.data) {
        this.courses = result.data.courses;
      }
    }, (error) => {
      this.alertService.danger(`Fail to load courses ${error.message}`);
    });
  }

  onEdit(course: Course) {
    this.service.formData = Object.assign({}, course);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCourse(id).subscribe(result => {
        if (result.data) {
          this.alertService.warning('Delete course successfully');
          this.service.refreshPage();
        }
      }, (error) => {
        this.alertService.danger(`Fail to delete course ${error.message}`);
      });
    }
  }

}
