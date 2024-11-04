


USE Sodv2201GroupProject
GO

INSERT INTO Terms (Term) VALUES
('Fall'),
('Winter'),
('Spring'),
('Summer');

INSERT INTO Departments (Department) VALUES
('Software Development');

INSERT INTO Programs (DepartmentID, Program, TermID, StartDate, EndDate, Length, Description, Fee, Code) VALUES
(1, 'Diploma', 1, '2024-09-04', '2024-12-15', '6 months', 'This 2 year diploma course teaches students everything they need to gain a junior developer job. Starting with programming foundation and fundamentals to building full stack web apps, games, and more by completion', 
50000, 23523),
(1, 'Certificate', 1, '2024-09-04', '2024-12-15', '6 months', 'Our certificate program offers students a fast track into the world of programming. Focusing on the basics and fundamentals.', 
30000, 23524),
(1, 'Post-Diploma', 1, '2024-09-04', '2024-12-15', '6 months', 'The Post-Diploma program takes a junior developers skills to the next level. Tackling new concepts and algorithms.', 
75000, 23525);


INSERT INTO Courses (CourseName, CourseCode, TermID, StartDate, EndDate, DepartmentID, ProgramID, Description) VALUES
('Sodv', 2202, 1, '2024-09-04', '2024-12-15', 1, 1, 'Teachers learners the ins and outs of object oriented programming'),
('Sodv', 2201, 1, '2024-09-04', '2024-12-15', 1, 1, 'Teachers learners the fundamentals of React in javascript.'),
('Data', 2201, 1, '2024-09-04', '2024-12-15', 1, 1, 'Teachers learners the fundamentals of database administration.'),
('Sodv', 1101, 1, '2024-09-04', '2024-12-15', 1, 2, 'Teachers learners the basics of programming using C++'),
('Tech', 1101, 1, '2024-09-04', '2024-12-15', 1, 2, 'Teachers learners the fundamentals of web programming.'),
('Tech', 1102, 1, '2024-09-04', '2024-12-15', 1, 2, 'Teachers learners the fundamentals of IoT.'),
('Sodv', 3202, 1, '2024-09-04', '2024-12-15', 1, 3, 'Teachers learners advanced object oriented architecture'),
('Data', 3202, 1, '2024-09-04', '2024-12-15', 1, 3, 'Teachers learners advanced concepts managing databases.'),
('Sodv', 3201, 1, '2024-09-04', '2024-12-15', 1, 3, 'Teachers learners advanced and modern web programming concepts.'),
('Sodv', 3203, 1, '2024-09-04', '2024-12-15', 1, 3, 'Teachers learners the basics of using Unreal Engine.');

INSERT INTO Users (FirstName, LastName, Email, Phone, Birthday, DepartmentID, ProgramID, TermID, UserName, Password, Status) VALUES
('Teeny', 'Tine', 'admin@gmail.com', '123-456-1234', '1900-10-10', 1, 1, 1, 'TT', '123', 'Admin'),
('Scram', 'Biss', 'scramb@gmail.com', '133-556-1739', '2010-06-10', 1, 1, 1, 'Scramb', '123', 'Student'),
('Rosa', 'Diaz', 'rosadiaz@gmail.com', '543-555-8643', '1990-02-15', 1, 3, 2, 'RD', '123', 'Student'),
('Michael', 'Scott', 'mscott@gmail.com', '434-325-9809', '1970-07-24', 1, 2, 3, 'Mscott', '123', 'Student');

INSERT INTO UserCourses (UserID, CourseID) VALUES
(2, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(4, 9);