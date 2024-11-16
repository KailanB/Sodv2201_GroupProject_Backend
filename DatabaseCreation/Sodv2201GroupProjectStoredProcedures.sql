

CREATE OR ALTER PROC Login(@Email AS VARCHAR(50), @ReturnEmailAdmin AS VARCHAR(50) OUTPUT, @ReturnEmail AS VARCHAR(50) OUTPUT)
AS
BEGIN
	SELECT @ReturnEmail = (SELECT Email FROM Students WHERE Email = @Email)
	SELECT @ReturnEmailAdmin = (SELECT Email FROM Admins WHERE Email = @Email)

	SELECT @ReturnEmail AS 'EmailStudent', @ReturnEmailAdmin AS 'EmailAdmin'
END

DECLARE @EmailAdmin AS VARCHAR(50);
DECLARE @EmailStudent AS VARCHAR(50);
EXEC Login 'admin@gmail.com', @EmailAdmin, @EmailStudent