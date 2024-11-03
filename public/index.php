<?php

use Core\Session;
use Core\ValidationException;
use Core\Router;

/* This file is the entry point for all incoming request */

const BASE_PATH = __DIR__ . '/../'; // Points to the root of the project

require BASE_PATH . "vendor/autoload.php";

session_start();

require BASE_PATH . 'Core/functions.php';

// spl_autoload_register(function($class) // autoload/lazyload a class that is declared
// {
//     $class = str_replace('\\', '/', $class);
//     require base_path("{$class}.php");
// });

require base_path('bootstrap.php');

$router = new \Core\Router;

$routes = require base_path('routes.php');
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];  

// if key:_method exist return the value otherwise use key:REQUEST_METHOD equivalent to isset()
$method = $_POST['_method'] ?? $_SERVER['REQUEST_METHOD'];

try {
    $router->route($uri, $method);
} catch(ValidationException $exception) {
    Session::put('errors', $exception->errors);
    Session::put('old', $exception->old);       
    
    redirect(Router::previousUrl());
}

Session::unflash();