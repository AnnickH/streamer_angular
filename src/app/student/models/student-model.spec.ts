import { StudentModel } from './student-model';

describe('StudentModel', () => {
  it('should create an instance', () => {
    expect(new StudentModel()).toBeTruthy();
  });

  it(`Should have 'Aubert' as lastName`, () => {
    const student: StudentModel = new StudentModel();
    // Fill student object
    student.lastName = 'Aubert';
    student.email = 'jean-luc.aubert@aelion.fr';
    student.login = 'jlaubert';
    student.password = 'toto';

    expect(student.lastName).toBe('Aubert');
  });
});
