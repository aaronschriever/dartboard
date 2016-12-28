CREATE TABLE Player (player_ID SMALLINT UNSIGNED NOT NULL  PRIMARY KEY AUTO_INCREMENT,
                     name  CHAR(20) NOT NULL,
                     nickname CHAR(20)NOT NULL);
CREATE TABLE Game (game_ID SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                   winner SMALLINT UNSIGNED,
                   is_complete BOOLEAN NOT NULL DEFAULT 0,
                   FOREIGN KEY (winner) REFERENCES Player(player_ID)
                   );
CREATE TABLE Game_set (set_ID SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       set_No SMALLINT(1) UNSIGNED NOT NULL, 
                       game_ID SMALLINT UNSIGNED NOT NULL,
                       winner SMALLINT UNSIGNED,
                       is_complete BOOLEAN NOT NULL DEFAULT 0,
                       FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                       FOREIGN KEY (winner) REFERENCES Player(player_ID)
                      );
CREATE TABLE Leg (leg_ID SMALLINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  Game_ID SMALLINT UNSIGNED NOT NULL,
                  set_ID SMALLINT UNSIGNED NOT NULL,
                  leg_no TINYINT(1) NOT NULL,
                  winner SMALLINT UNSIGNED,
                  is_complete BOOLEAN NOT NULL DEFAULT 0,
                  FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                  FOREIGN KEY (winner) REFERENCES Player(player_ID),
                  FOREIGN KEY (set_ID) REFERENCES Game_set(set_ID)
                  );
CREATE TABLE Turn (turn_ID SMALLINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                   player_ID SMALLINT UNSIGNED NOT NULL,
                   game_ID SMALLINT UNSIGNED NOT NULL,
                   set_ID SMALLINT UNSIGNED NOT NULL,
                   leg_ID SMALLINT UNSIGNED NOT NULL,
                   currentScore SMALLINT(3) UNSIGNED,
                   dart1_score SMALLINT(3) UNSIGNED,
                   dart1_score_type CHAR(1),
                   dart2_score SMALLINT(3) UNSIGNED,
                   dart2_score_type CHAR(1),
                   dart3_score SMALLINT(3) UNSIGNED,
                   dart3_score_type CHAR(1),
                   FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                   FOREIGN KEY (player_ID) REFERENCES Player(player_ID),
                   FOREIGN KEY (set_ID) REFERENCES Game_set(set_ID),
                   FOREIGN KEY (leg_ID) REFERENCES Leg(leg_ID)
                   );