import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/course.service';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/shared/course.model';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(
    public service: CourseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      title: '',
      author: '',
      description: '',
      topic: '',
      url: ''
    };
  }

  onSubmit(form: NgForm) {
    const course = { ...form.value }
    delete course.id;
    if (form.value.id == null) {
      this.addCourse(course);
    } else {
      this.editCourse(form.value.id, course);
    }
    this.resetForm(form);
  }

  addCourse(course: Course) {
    this.service.createCourse(course).subscribe(result => {
      if (result.data) {
        this.alertService.success('Add course successfully');
        this.service.refreshPage();
      }
    }, (error) => {
      this.alertService.danger(`Fail to add course ${error.message}`);
    });
  }

  editCourse(id: number, course: Course) {
    this.service.updateCourse(id, course).subscribe(result => {
      if (result.data) {
        this.alertService.success('Update course successfully');
        this.service.refreshPage();
      }
    }, (error) => {
      this.alertService.danger(`Fail to update course ${error.message}`);
    });
  }

}
