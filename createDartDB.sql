CREATE TABLE Player (player_ID SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                     name  CHAR(20) NOT NULL,
                     nickname CHAR(20)NOT NULL);
CREATE TABLE Game (game_ID SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                   winner SMALLINT,
                   is_complete BOOLEAN NOT NULL DEFAULT 0,
                   FOREIGN KEY (winner) REFERENCES Player(player_ID)
                   );
CREATE TABLE Game_set (set_ID SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       set_No SMALLINT(1) NOT NULL, 
                       game_ID SMALLINT NOT NULL,
                       winner SMALLINT,
                       is_complete BOOLEAN NOT NULL DEFAULT 0,
                       FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                       FOREIGN key (winner) REFERENCES Player(player_ID)
                      );
CREATE TABLE Leg (leg_ID SMALLINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  Game_ID SMALLINT NOT NULL,
                  set_ID SMALLINT NOT NULL,
                  leg_no TINYINT(1) NOT NULL,
                  winner SMALLINT,
                  is_complete BOOLEAN NOT NULL DEFAULT 0,
                  FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                  FOREIGN key (winner) REFERENCES Player(player_ID),
                  FOREIGN key (set_ID) REFERENCES Game_set(set_ID);
                  );
CREATE TABLE turn (turn_ID SMALLINT NOT NULL AUTO_INCREMENT,
                   player_ID SMALLINT NOT NULL,
                   game_ID SMALLINT NOT NULL,
                   set_ID SMALLINT NOT NULL,
                   leg_ID SMALLINT NOT NULL,
                   currentScore SMALLINT(3),
                   dart1_score SMALLINT(3),
                   dart1_score_type CHAR(1),
                   dart2_score SMALLINT(3),
                   dart2_score_type CHAR(1),
                   dart3_score SMALLINT(3),
                   dart3_score_type CHAR(1),
                   FOREIGN KEY (game_ID) REFERENCES Game(game_ID),
                   FOREIGN key (player_ID) REFERENCES Player(player_ID),
                   );