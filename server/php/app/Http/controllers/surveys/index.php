<?php

use Core\App;
use Core\Database;

// $surveys = App::resolve(Database::class)->query("SELECT * from ")->find();

echo json_encode($surveys);

view("student-homepage.html");