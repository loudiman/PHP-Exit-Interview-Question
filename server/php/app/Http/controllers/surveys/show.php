<?php

use Core\App;
use Core\Database;

// $survey = App::resolve(Database::class)->query('')->findOrFail();

echo json_encode($survey);

view("student-survey.html");