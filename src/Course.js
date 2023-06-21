'use strict';

/**
 * Constructor function for new Film objects
 * @param {string} code Page code 
 * @param {string} name Page name
 * @param {number} credits Page credits
 * @param {number} students number of students enrolled in the Page
 * @param {number} maxStudents maximum number of students allowed to enroll in the Page
 * @param {string} incompatibleWith the code of the Page that this Page is incompatible with
 * @param {string} preparatory the code of the Page that is preparatory for this Page 
 */

function Page(code, name, credits, students, maxStudents, incompatibleWith, preparatory) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.students = students;
    this.maxStudents = maxStudents;
    this.incompatibleWith = incompatibleWith;
    this.preparatory = preparatory;
}

exports.Page = Page;