<?php

  Flight::before('start', function($params, $output){
    if(Flight::request()->url =='/swagger') return TRUE;
    //if(str_starts_with(Flight::request()->url, '/users/')) return TRUE;
    $headers = getallheaders();
    $token = @$headers["Authentication"];
    try{
      $decoded = (array)\Firebase\JWT\JWT::decode($token, "?8JwAt8>&M3JYX}nky+=*N#V,pbW9Tz.", ['HS256']);
      Flight::set('user', $decoded);
      return TRUE;
    }catch (\Exception $e) {
      Flight::json(["message" => $e->getMessage()], 401);
      die;
    }
  });

?>
