<?php

namespace Core;

class ValidationException extends \Exception 
{
    // store a value once but can never be update
    public readonly array $errors;
    public readonly array $old;

    public static function throw($errors, $old)
    {
        $instance = new static;

        $instance->errors = $errors;
        $instance->old = $old;

        throw $instance;
    }
}
