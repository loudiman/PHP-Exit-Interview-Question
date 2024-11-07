<?php

$router->get('/login', 'session/create.php');
$router->post('/login', 'session/store.php');