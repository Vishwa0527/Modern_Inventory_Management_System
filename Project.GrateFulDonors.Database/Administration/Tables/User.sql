CREATE TABLE [Administration].[User] (
    [UserID]       INT          IDENTITY (1, 1) NOT NULL,
    [UserName]     VARCHAR (50) NULL,
    [UserType]     INT          NOT NULL,
    [JoinedDate]   DATETIME     NULL,
    [IsActive]     BIT          NULL,
    [CreatedBy]    INT          NULL,
    [CreatedDate]  DATETIME     NULL,
    [ModifiedBy]   INT          NULL,
    [ModifiedDate] DATETIME     NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserID] ASC)
);

