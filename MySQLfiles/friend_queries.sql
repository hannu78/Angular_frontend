SELECT * FROM user;
SELECT username FROM user;
SELECT username, pass FROM user;
SELECT * FROM user WHERE username="poju";
SELECT * FROM user WHERE username="poju" AND pass="pp" ORDER BY username;
SELECT * FROM friend;
SELECT user.username, friend.friend_name, friend.friend_address, friend.friend_age FROM user INNER JOIN friend ON user.user_id=friend.user_id WHERE user.username="poju";
SELECT user.username, friend.friend_name, friend.friend_address, friend.friend_age FROM user INNER JOIN friend ON user.user_id=friend.user_id WHERE friend.friend_age<=90;
/*Call a stored procedure*/
CALL getAllUsers();
CALL getLoginInfo("poju", "pp");
CALL getFriendsByUsername("poju");
CALL getFriendsByUsername("epeli");
CALL getFriendsByUserid (3);
CALL getIdByUsername("poju");
CALL searchFriendByName("Matti");
CALL getFriendIdByName("Matti Meikäläinen");

SELECT * FROM friend WHERE name LIKE CONCAT('%', "Matti", '%');

UPDATE friend SET email="TBD" WHERE name="Matti Meikäläinen";