<?php
/* SWAGGER documentation */
/**
 * @OA\Info(title="CarMarket API", version="0.1")
 * @OA\OpenApi(
 *   @OA\Server(url="http://localhost/carmarket/api/", description="Development Environment"),
 *   @OA\Server(url="https://carmarket.com/api/", description="Production Environment")
 * )
 */

 /**
  * @OA\Get(path="/users", tags={"user"},
  *     @OA\Response(response="200", description="List accounts from database")
  * )
  */
  Flight::route('GET /users', function(){
      $offset = Flight::query('offset', 0);
      $limit = Flight::query('limit', 10);
      $search = Flight::query('search');
      $order = Flight::query('order', "-id");
      Flight::json(Flight::userservice()->get_users($search, $offset, $limit, $order));
  });



  /**
   * @OA\Get(path="/users/{id}", tags={"user"},
   *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", example=1, description="ID of the user"),
   *     @OA\Response(response="200", description="Fetch individual account")
   * )
   */
  Flight::route('GET /users/@id', function($id){
      flight::json(Flight::userservice()->get_by_id($id));
  });




  Flight::route('POST /users/add', function(){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->add($data));
  });




  /**
   * @OA\Post(path="/users/register", tags={"user"},
   *  @OA\Response(response="200", description="Message that user has been created.")
   * )
   */
  Flight::route('POST /users/register', function(){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::userservice()->register($data));
  });



  /**
   * @OA\Get(path="/users/confirm/{token}", tags={"user"},
   *     @OA\Response(response="200", description="Message upon successfull activation.")
   * )
   */
  Flight::route('GET /users/confirm/@token', function($token){
      Flight::userservice()->confirm($token);
      Flight::json(["message" => "Your account has been activated."]);
  });




  /**
   * @OA\Put(path="/users/{id}", tags={"user"},
   *     @OA\Response(response="200", description="Update account based on id")
   * )
   */
  Flight::route('PUT /users/@id', function($id){
      $data = Flight::request()->data->getData();

      Flight::json(Flight::userservice()->update($id, $data));
  });

?>
