export class Student {
//   StudentId: number;
//   FirstName: string;
//   LastName: string;
//   School: string;
  constructor(
    public StudentId: number,
    public FirstName: string,
    public LastName: string,
    public School: string
  ) {
    this.StudentId = StudentId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.School = School;
  }
}
