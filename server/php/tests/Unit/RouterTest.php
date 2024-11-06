<?php

it('Check if the Router class exist', function() {
    var_dump(class_exists('server\php\Core\Router'));
    var_dump(file_exists('server\php\vendor\autoload.php'));
    // expect($router)->toBeClass();
});