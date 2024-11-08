<?php

$router->get('/', 'session/create.php');
$router->post('/', 'session/store.php');

$router->get('/student/surveys', 'surveys/index.php');
$router->get('/student/survey', 'surveys/show.php');