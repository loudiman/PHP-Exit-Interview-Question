<?php

use Core\Session;
use Core\ValidationException;
use Core\Router;

/* This file is the entry point for all incoming request */

const BASE_PATH = __DIR__ . '/../'; // Points to the root of the project

require BASE_PATH . 'Core/functions.php';

require base_path("vendor/autoload.php");

require base_path('bootstrap.php');

session_start();

$router = new \Core\Router;

$routes = require base_path('routes.php');

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];  

$method = $_POST['_method'] ?? $_SERVER['REQUEST_METHOD'];

try {
    $router->route($uri, $method);
} catch(ValidationException $exception) {
    Session::put('errors', $exception->errors);
    Session::put('old', $exception->old);       
    
    redirect(Router::previousUrl());
}

Session::unflash();