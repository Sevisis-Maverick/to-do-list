CREATE TABLE todolist(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (40) NOT NULL,
	"description" VARCHAR (320) NOT NULL,
	"completion" VARCHAR (40) NOT NULL DEFAULT 'Uncompleted'
);

INSERT INTO "todolist" ("task", "description") 
VALUES 
('Abduct Vex', 'This edgy character interests me. I want him on my ship.'),
('Get a cat', 'I''ve always loved cats and their independant attitudes.'),
('Delete Acton', 'I dont know why I left him on that Leviathan thing, he needs to go.'),
('Upgrade my ship', 'If I''m going to bring tennants aboard this thing, it needs more than just a cockpit and engine room.'),
('Tell Vee to shut up', 'She talks too much.');

SELECT * FROM "todolist";



DROP TABLE "todolist";