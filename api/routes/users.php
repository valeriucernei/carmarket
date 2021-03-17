<?php

  /**
   * API Return all users in JSON
   */
  Flight::route('GET /users', function(){
      flight::json(Flight::userdao()->get_all());
  });



  /**
   * API Return users data in JSON by ID
   * @var int User ID
   */
  Flight::route('GET /users/@id', function($id){
      flight::json(Flight::userdao()->get_by_id($id));
  });



  /**
   * API Add new user in Data Base, and return user ID
   * @var [type]
   */
  Flight::route('POST /users', function(){
      Flight::json(Flight::userdao()->add(Flight::request()->data->getData()));
  });



  /**
   * Update user data in Data Base by ID
   * @var int User ID
   */
  Flight::route('PUT /users/@id', function($id){
      flight::json(Flight::userdao()->get_by_id($id));

      Flight::userdao()->update($id, Flight::request()->data->getData());
      Flight::json(Flight::request()->data->getData());
  });

?>