CREATE TABLE [dbo].[Grafs](
	[ID] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Img] [nvarchar](255) NULL,
	[Vid] [nvarchar](255) NULL,
	[Description] [text] NULL,
	[Superior_Id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Graf] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Grafs]  WITH CHECK ADD FOREIGN KEY([Superior_Id])
REFERENCES [dbo].[Grafs] ([ID])
GO