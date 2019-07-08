create table "tasks" (
	"id" serial PRIMARY KEY,
    "taskType" varchar(128) NOT NULL,
    "do-by" varchar(20) NOT NULL,
    "taskIn" varchar (300) NOT NULL,
    "name" varchar(128) NOT NULL,
    "done" boolean default false
);


INSERT INTO "tasks" ("taskType", "doBy", "taskIn", "name") 
    VALUES('Inside', 'Monday', 'Laundry', 'Jake' );
    
INSERT INTO "tasks" ("taskType", "doBy", "taskIn", "name") 
    VALUES('Group', 'Wednesday', 'Dishes', 'Jake' );
    
INSERT INTO "tasks" ("taskType", "doBy", "taskIn", "name") 
    VALUES('Quick-Fixer', 'Friday', 'Lawn Care', 'Jake' );
    
INSERT INTO "tasks" ("taskType", "doBy", "taskIn", "name") 
    VALUES('Outside', 'Sunday', 'Vacuum', 'Jake' );