create table user (
	user_id int NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    pass varchar(255) NOT NULL,
    /*
	Every table must have one of the keys defined as primary key. 
	Unique user_id is a good choice here. 
	*/
    primary key(user_id)
) Engine=InnoDb;

create table friend ( 
	_id int NOT NULL UNIQUE AUTO_INCREMENT,
    name varchar(255),
    address varchar(255),
    age int,
    email varchar(255),
    user_id int,
    primary key(_id),
    foreign key (user_id) references user(user_id)
) Engine=InnoDb;

/*DROP TABLE friend;*/
