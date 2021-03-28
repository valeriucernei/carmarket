<?php
  /*SWAGGER documentation*/
  /**
  * @OA\Get(path="/cars/brands", tags={"cars"},
  *     @OA\Response(response="200", description="Fetch all available car brands")
  * )
  */
  Flight::route('GET /cars/brands', function(){
    flight::json(Flight::carsservice()->get_car_brands());
  });



  /**
  * @OA\Get(path="/cars/models/{id}", tags={"cars"},
  *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", example=1, description="ID of car Brand"),
  *     @OA\Response(response="200", description="Fetch all car models of a specific brand")
  * )
  */
  Flight::route('GET /cars/models/@id', function($id){
    flight::json(Flight::carsservice()->get_car_models($id));
  });

?>
