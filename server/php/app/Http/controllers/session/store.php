<?php

use Core\Authenticator;
use app\Http\Forms\LoginForm;

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Content-Type: application/json");

// Retrieve the raw POST data
$inputData = file_get_contents("php://input");

$data = json_decode($inputData, true);

$form = LoginForm::validate($attributes = [
    'email' => $data['email'],
    'password' => $data['password']
    // '_login' => $data['_login'],
]);

$signedIn = (new Authenticator)->
    attempt($attributes['email'], $attributes['password']);


if(!$signedIn)
{
    $form->error(
        'email', 'No matching account for the email and password.'
        )->throw();
}

echo json_encode($_SESSION['user']);