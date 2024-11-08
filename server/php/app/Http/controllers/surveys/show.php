<?php

use Core\App;
use Core\Database;

$survey = App::resolve(Database::class)->query('SELECT q.question_id, q.question_json, q.question_type
FROM question AS q LEFT JOIN questionaire
ON q.question_id = questionaire.question_id
WHERE questionaire.survey_id = :id;', [
    'id' => $_GET['id']
])->findOrFail();

// redirect();

echo json_encode($survey);

// view("student-survey.html");