<?php

namespace Core;

use Core\App;
use Core\Database;

class Authenticator 
{

    public function attempt($email, $password)
    {
        $user = App::resolve(Database::class)->query("SELECT * from users WHERE email = :email",
        [
            'email' => $email
        ])->find();

        if ($user) 
        {
            if (password_verify($password, $user['password']))
            {
                login([
                    'userId' => $user['id'],
                    'userType' => $user['type'],
                    'email' => $email
                ]);

                return true;
            }
        } 

        return false;
    }
}