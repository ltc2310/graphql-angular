import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  formData: Course;

  constructor(private apollo: Apollo) { }

  getCourseList(): Observable<any> {
    const CoursesQuery = gql`
      query Courses {
        courses {
          id,
          title,
          author,
          description,
          topic,
          url
        }
      }
    `;
    return this.apollo.watchQuery({ query: CoursesQuery }).valueChanges;
  }

  createCourse(course: Course): Observable<any> {
    const createCourseMutation = gql`
    mutation createCourse($input: courseInput) {
      createCourse(input: $input) {
        id,
        title,
        author
      }
    }
  `;
    return this.apollo.mutate({
      mutation: createCourseMutation,
      variables: {
        input: course
      }
    });
  }

  updateCourse(id: number, course: Course): Observable<any> {
    const updateCourseMutation = gql`
    mutation updateCourse($id: Int!, $input: courseInput) {
      updateCourse(id: $id, input: $input) {
        id
      }
    }
  `;
    return this.apollo.mutate({
      mutation: updateCourseMutation,
      variables: {
        id,
        input: course
      }
    });
  }

  deleteCourse(id: number): Observable<any> {
    const deleteCourseMutation = gql`
    mutation deletecourse($id: Int!) {
      deleteCourse(id: $id){
        id
      }
    }
  `;
    return this.apollo.mutate({
      mutation: deleteCourseMutation,
      variables: {
        id
      }
    });
  }

  refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

}
