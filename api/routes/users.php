<?php
  /**
   * API Return all users in JSON
   */
  Flight::route('GET /users', function(){
      $offset = Flight::query('offset', 0);
      $limit = Flight::query('limit', 10);
      $search = Flight::query('search');

      Flight::json(Flight::userservice()->get_users($search, $offset, $limit));
  });



  /**
   * API Return users data in JSON by ID
   * @var int User ID
   */
  Flight::route('GET /users/@id', function($id){
      flight::json(Flight::userservice()->get_by_id($id));
  });



  /**
   * API Add new user in Data Base, and return user ID
   * @var [type]
   */
  Flight::route('POST /users/add', function(){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->add($data));
  });



  /**
   * API Register new user in Data Base, and return user ID
   * @var [type]
   */
  Flight::route('POST /users/register', function(){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->register($data));
  });

  /**
   * API Confirm new user in Data Base by TOKEN
   * @var [type]
   */
  Flight::route('GET /users/confirm/@token', function($token){
      Flight::userservice()->confirm($token);
      Flight::json(["message" => "Your account has been activated."]);
  });



  /**
   * Update user data in Data Base by ID
   * @var int User ID
   */
  Flight::route('PUT /users/@id', function($id){
      $data = Flight::request()->data->getData();

      Flight::json(Flight::userservice()->update($id, $data));
  });

?>
