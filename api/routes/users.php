<?php
/* SWAGGER documentation */
/**
 * @OA\Info(title="CarMarket API", version="0.1")
 * @OA\OpenApi(
 *   @OA\Server(url="http://localhost/carmarket/api/", description="Development Environment"),
 *   @OA\Server(url="https://car-market.live/api/", description="Production Environment")
 * ),
 * @OA\SecurityScheme(
 *        securityScheme="ApiKeyAuth",
 *        in="header",
 *        name="Authentication",
 *        type="apiKey"
 * )
 */

 /**
  * @OA\Get(path="/admin/accounts", tags={"x-admin", "users"}, security={{"ApiKeyAuth":{}}},
  *     @OA\Parameter(type="integer", in="query", name="offset", default=0, description="Offset for pagination"),
  *     @OA\Parameter(type="integer", in="query", name="limit", default=15, description="Limit the number of results"),
  *     @OA\Parameter(type="string", in="query", name="search", description="Search string for accounts (Case insensitive search)"),
  *     @OA\Parameter(type="string", in="query", name="order", default="-id", description="Sorting for return elements -column_name ascending, or +column_name descending"),
  *     @OA\Response(response="200", description="List accounts from database")
  * )
  */
  Flight::route('GET /admin/accounts', function(){
      $offset = Flight::query('offset', 0);
      $limit = Flight::query('limit', 10);
      $search = Flight::query('search');
      $order = Flight::query('order', "-id");
      Flight::json(Flight::userservice()->get_users($search, $offset, $limit, $order));
  });



  /**
   * @OA\Get(path="/admin/account/{id}", tags={"x-admin", "users"}, security={{"ApiKeyAuth":{}}},
   *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", example=1, description="ID of the user"),
   *     @OA\Response(response="200", description="Fetch individual account")
   * )
   */
  Flight::route('GET /admin/account/@id', function($id){
    flight::json(Flight::userservice()->get_by_id($id));
  });



  /**
   * @OA\Post(path="/register", tags={"login"},
   *   @OA\RequestBody(description="Basic user account info", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="username", required="true", type="string", example="Test_Username",	description="User's username" ),
   *    				 @OA\Property(property="fname", required="true", type="string", example="First_Name",	description="User's first name" ),
   *    				 @OA\Property(property="lname", type="string", example="Last_Name",	description="User's last name" ),
   *    				 @OA\Property(property="pass", required="true", type="string", example="asd12345",	description="User's password" ),
   *    				 @OA\Property(property="email", required="true", type="string", example="example@mail.com",	description="User's email address" ),
   *    				 @OA\Property(property="phone", required="true", type="string", example="+1123123123",	description="User's phone number" )
   *          )
   *       )
   *     ),
   *  @OA\Response(response="200", description="Account that has been added into database with ID assigned.")
   * )
   */
  Flight::route('POST /register', function(){
      $data = Flight::request()->data->getData();
      Flight::userservice()->register($data);
      Flight::json(['message' => "Confirmation email has been sent."]);
  });



  /**
   * @OA\Get(path="/confirm/{token}", tags={"login"},
   *     @OA\Parameter(type="string", in="path", name="token", default=123, description="Temporary token for activating account"),
   *     @OA\Response(response="200", description="Message upon successfull activation.")
   * )
   */
  Flight::route('GET /confirm/@token', function($token){
      Flight::userservice()->confirm($token);
      Flight::json(["message" => "Your account has been activated."]);
  });



  /**
   * @OA\Put(path="/admin/account/{id}", tags={"x-admin", "users"}, security={{"ApiKeyAuth": {}}},
   *   @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", default=1),
   *   @OA\RequestBody(description="Basic account info that is going to be updated", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="username", type="string", example="Test_Username",	description="User's username" ),
   *    				 @OA\Property(property="fname", type="string", example="Ivan",	description="User's first name" ),
   *    				 @OA\Property(property="lname", type="string", example="Ivanov",	description="User's last name" ),
   *    				 @OA\Property(property="pass", type="string", example="querty123",	description="User's password" ),
   *    				 @OA\Property(property="email", type="string", example="example@mail.com",	description="User's email address" ),
   *    				 @OA\Property(property="phone", type="string", example="+123123123",	description="User's phone address" )
   *          )
   *       )
   *     ),
   *     @OA\Response(response="200", description="Update account based on id")
   * )
   */
  Flight::route('PUT /admin/account/@id', function($id){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->update($id, $data));
  });



  /**
   * @OA\Post(path="/login", tags={"login"},
   *   @OA\RequestBody(description="User authorization route", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="login", required="true", type="string", example="Test_Username",	description="User's username or email" ),
   *    				 @OA\Property(property="pass", required="true", type="string", example="asd12345",	description="User's password" )
   *          )
   *       )
   *     ),
   *  @OA\Response(response="200", description="You have been successfully logged.")
   * )
   */
  Flight::route('POST /login', function(){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->login($data));
  });



  /**
   * @OA\Post(path="/forgot", tags={"login"},
   *   @OA\RequestBody(description="User forgot password route", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="email", required="true", type="string", example="email@gmail.com",	description="User's email address" )
   *          )
   *       )
   *     ),
   *  @OA\Response(response="200", description="Recovery link has been sent to your email address")
   * )
   */
  Flight::route('POST /forgot', function(){
      $data = Flight::request()->data->getData();
      Flight::userservice()->forgot($data);
      Flight::json(["message" => "Recovery link has been sent to your email address."]);
  });



  /**
   * @OA\Post(path="/reset", tags={"login"},
   *   @OA\RequestBody(description="User forgot password route", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="token", required="true", type="string", example="bla-bla-bla",	description="Recovery token" ),
   *    				 @OA\Property(property="pass", required="true", type="string", example="Asd12345",	description="New Password" )
   *          )
   *       )
   *     ),
   *  @OA\Response(response="200", description="Password has been changed.")
   * )
   */
  Flight::route('POST /reset', function(){
      $data = Flight::request()->data->getData();
      Flight::userservice()->reset($data);
      Flight::json(["message" => "Password has been changed."]);
  });



  /**
   * @OA\Get(path="/user/account", tags={"x-user", "user"}, security={{"ApiKeyAuth": {}}},
   *     @OA\Response(response="200", description="Fetch user account")
   * )
   */
  Flight::route('GET /user/account', function(){
    Flight::json(Flight::userservice()->get_by_id(Flight::get('user')['id']));
  });

?>
