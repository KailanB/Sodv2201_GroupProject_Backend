


USE Sodv2201GroupProject
GO

INSERT INTO Terms (Term, StartDate, EndDate) VALUES
('Fall', '2024-09-04', '2024-12-15'),
('Winter', '2025-01-09', '2025-03-22'),
('Spring', '2025-03-30', '2024-06-18'),
('Summer', '2025-06-29', '2025-08-30');

INSERT INTO Departments (Department) VALUES
('Software Development');

INSERT INTO Status (Status) VALUES
('Student'),
('Admin');

INSERT INTO Programs (DepartmentID, Credential, StartDate, EndDate, Length, Description, Fee, Code) VALUES
(1, 'Diploma', '2024-09-04', '2026-04-17', '2 Years', 'This 2 year diploma course teaches students everything they need to gain a junior developer job. Starting with programming foundation and fundamentals to building full stack web apps, games, and more by completion', 
50000, 23523),
(1, 'Certificate', '2024-09-04', '2025-04-27', '8 months', 'Our certificate program offers students a fast track into the world of programming. Focusing on the basics and fundamentals.', 
30000, 23524),
(1, 'Post-Diploma', '2024-09-04', '2024-04-27', '8 months', 'The Post-Diploma program takes a junior developers skills to the next level. Tackling new concepts and algorithms.', 
75000, 23525);


INSERT INTO Courses (CourseName, CourseCode, TermID, ProgramID, Description) VALUES
('Sodv', 2202, 1,  1, 'Teachers learners the ins and outs of object oriented programming'),
('Sodv', 2201, 1,  1, 'Teachers learners the fundamentals of React in javascript.'),
('Data', 2201, 1,  1, 'Teachers learners the fundamentals of database administration.'),
('Sodv', 1101, 1,  2, 'Teachers learners the basics of programming using C++'),
('Tech', 1101, 1,  2, 'Teachers learners the fundamentals of web programming.'),
('Tech', 1102, 1,  2, 'Teachers learners the fundamentals of IoT.'),
('Sodv', 3202, 1,  3, 'Teachers learners advanced object oriented architecture'),
('Data', 3202, 1,  3, 'Teachers learners advanced concepts managing databases.'),
('Sodv', 3201, 1,  3, 'Teachers learners advanced and modern web programming concepts.'),
('Sodv', 3203, 1,  3, 'Teachers learners the basics of using Unreal Engine.');

INSERT INTO Students (FirstName, LastName, Email, PhoneNumber, Birthday, ProgramID, TermID, UserName, Password, StatusID) VALUES
('Scram', 'Biss', 'scramb@gmail.com', '133-556-1739', '2010-06-10', 1, 1, 'Scramb', '123', 1),
('Rosa', 'Diaz', 'rosadiaz@gmail.com', '543-555-8643', '1990-02-15', 3, 2, 'RD', '123', 1),
('Michael', 'Scott', 'mscott@gmail.com', '434-325-9809', '1970-07-24', 2, 3, 'Mscott', '123', 1);

INSERT INTO Admins (FirstName, LastName, Email, PhoneNumber, Birthday, userName, Password, StatusID) VALUES
('Teeny', 'Tine', 'admin@gmail.com', '123-456-1234', '1900-10-10', 'TT', '123', 2)


INSERT INTO StudentCourses (StudentID, CourseID) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9);

INSERT INTO Messages (FullName, Email, Message) VALUES 
('Eleanor Shellstrop', 'eleanor@gmail.com', 'Hi I was just wondering if you had a moral philosophy program? If not is your college planning to add one soon?? Regards. Eleanor.'),
('Adrian Pimento', 'adrianpimento@gmail.com', 'I just found your college! I want to apply to your software development class but I was having trouble registering. I think I applied too many times'),
('Frito', 'frito@gmail.com', 'Does your college offer scholarships? I really like my money so I do not want to spend that much');