
USE master;
GO


IF DB_ID('Sodv2201GroupProject') IS NOT NULL
BEGIN
	ALTER DATABASE Sodv2201GroupProject SET SINGLE_USER WITH ROLLBACK IMMEDIATE

	DROP DATABASE Sodv2201GroupProject;
END;
GO

CREATE DATABASE Sodv2201GroupProject;

PRINT DB_ID('Sodv2201GroupProject');

GO

USE Sodv2201GroupProject;
GO

CREATE TABLE Terms (
    TermID INT PRIMARY KEY IDENTITY(1,1),
    Term VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);

CREATE TABLE Departments (
	DepartmentID INT PRIMARY KEY IDENTITY(1,1),
	Department VARCHAR(50) NOT NULL

);

-- status refers to student, admin or any other type of account etc.
CREATE TABLE Status (

	StatusID INT PRIMARY KEY IDENTITY(1,1),
	Status VARCHAR(50) NOT NULL
);


CREATE TABLE Programs (
	ProgramID INT PRIMARY KEY IDENTITY(1,1),
	Credential VARCHAR(50) NOT NULL,
	DepartmentID INT NOT NULL,
	StartDate DATE NOT NULL,
	EndDate DATE NOT NULL,
	Length VARCHAR(50) NOT NULL,
	Description VARCHAR(1000),
	Fee MONEY NOT NULL,
	Code INT NOT NULL,

	FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID) ON DELETE NO ACTION ON UPDATE CASCADE,
	   	  
);

CREATE TABLE Courses (
	CourseID INT PRIMARY KEY IDENTITY(1,1),
	CourseName VARCHAR(50) NOT NULL, 
	CourseCode INT NOT NULL,
	TermID INT NOT NULL,
	ProgramID INT NOT NULL,
	Description VARCHAR(200),

	FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID) ON DELETE NO ACTION ON UPDATE NO ACTION

);

CREATE TABLE Students (

	StudentID INT PRIMARY KEY IDENTITY(1,1),
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	Email VARCHAR (50) NOT NULL,
	PhoneNumber VARCHAR(20) NOT NULL,
	Birthday DATE NOT NULL,
	ProgramID INT NOT NULL,
	TermID INT NOT NULL,
	UserName VARCHAR(50) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	StatusID INT NOT NULL,
	

	FOREIGN KEY (TermID) REFERENCES Terms(TermID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (StatusID) REFERENCES Status(StatusID) ON DELETE NO ACTION ON UPDATE NO ACTION

);

CREATE TABLE Admins (

	AdminID INT PRIMARY KEY IDENTITY(1,1),
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	Email VARCHAR (50) NOT NULL,
	PhoneNumber VARCHAR(20) NOT NULL,
	Birthday DATE NOT NULL,
	UserName VARCHAR(50) NOT NULL,
	Password NVARCHAR(255) NOT NULL,
	StatusID INT NOT NULL,
	
	FOREIGN KEY (StatusID) REFERENCES Status(StatusID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Intermediary table for students and courses

CREATE TABLE StudentCourses (

	StudentID INT NOT NULL,
	CourseID INT NOT NULL,

	PRIMARY KEY (StudentID, CourseID),
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
	FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
	
	
);


CREATE TABLE Messages (
    MessageID INT PRIMARY KEY IDENTITY(1,1),
	FullName VARCHAR(100) NOT NULL,
	Email VARCHAR (50) NOT NULL,
    Message VARCHAR(MAX) NOT NULL
);