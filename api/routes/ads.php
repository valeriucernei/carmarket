<?php
  /**
  * @OA\Get(path="/ads", tags={"advertisements"},
  *     @OA\Parameter(type="integer", in="query", name="offset", default=0, description="Offset for pagination"),
  *     @OA\Parameter(type="integer", in="query", name="limit", default=15, description="Limit the number of results"),
  *     @OA\Parameter(type="string", in="query", name="search", description="Search string for accounts (Case insensitive search)"),
  *     @OA\Parameter(type="string", in="query", name="order", default="-ads.id", description="Sorting for return elements -column_name ascending, or +column_name descending"),
  *     @OA\Parameter(type="integer", in="query", name="car_body", default=null, description="Car Body number"),
  *     @OA\Parameter(type="integer", in="query", name="fabricated_min", default=1970, description="Minimal year of fabrication"),
  *     @OA\Parameter(type="integer", in="query", name="fabricated_max", default=2021, description="Maximum year of fabrication"),
  *     @OA\Parameter(type="integer", in="query", name="km_min", default=0, description="Minimum mileage"),
  *     @OA\Parameter(type="integer", in="query", name="km_max", default=1000000, description="Maximum mileage"),
  *     @OA\Parameter(type="integer", in="query", name="price_min", default=0, description="Minimal price"),
  *     @OA\Parameter(type="integer", in="query", name="price_max", default=1000000, description="Maximum price"),
  *     @OA\Parameter(type="integer", in="query", name="gearbox", default=null, description="Gearbox type number"),
  *     @OA\Parameter(type="integer", in="query", name="fuel_type", default=null, description="Fuel type number"),
  *     @OA\Response(response="200", description="Lists ads from database")
  * )
  */
  Flight::route('GET /ads', function(){
    $offset = Flight::query('offset', 0);
    $limit = Flight::query('limit', 10);
    $search = Flight::query('search');
    $order = Flight::query('order', "-ads.id");
    $car_body = Flight::query('car_body');
    $fabricated_min = Flight::query('fabricated_min', 1970);
    $fabricated_max = Flight::query('fabricated_max', date("Y"));
    $km_min = Flight::query('km_min', 0);
    $km_max = Flight::query('km_max', 1000000);
    $price_min = Flight::query('price_min', 0);
    $price_max = Flight::query('price_max', 1000000);
    $gearbox = Flight::query('gearbox');
    $fuel_type = Flight::query('fuel_type');
    Flight::json(Flight::adsservice()->get_ads($search, $offset, $limit, $order,
    $car_body, $fabricated_min, $fabricated_max, $km_min, $km_max, $price_min,
    $price_max, $gearbox, $fuel_type));
  });



  /**
  * @OA\Get(path="/ads/{id}", tags={"advertisements"},
  *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", example=1, description="ID of the ad"),
  *     @OA\Response(response="200", description="Fetch individual advertisement")
  * )
  */
  Flight::route('GET /ads/@id', function($id){
    flight::json(Flight::adsservice()->get_ad_by_id($id));
  });



  /**
  * @OA\Post(path="/ads/add", tags={"advertisements"},
  *   @OA\RequestBody(description="Basic Adv Info", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *    				 @OA\Property(property="user_id", required="true", type="integer", example="1",	description="User's username" ),
  *    				 @OA\Property(property="title", required="true", type="string", example="Advertisement Title",	description="Advertisement's Title" ),
  *    				 @OA\Property(property="description", type="string", example="Best car EVER!",	description="Advertisement's Description" ),
  *    				 @OA\Property(property="model", required="true", type="integer", example="7",	description="Car Model Number from Data Base" ),
  *    				 @OA\Property(property="car_body", required="true", type="integer", example="4",	description="Car Body Number from Data Base" ),
  *    				 @OA\Property(property="fabricated", required="true", type="integer", example="2019",	description="Car fabrication year" ),
  *    				 @OA\Property(property="km", type="integer", example="49000",	description="Car mileage" ),
  *    				 @OA\Property(property="price", type="integer", example="112000",	description="Car's price" ),
  *    				 @OA\Property(property="gearbox", type="integer", example="2",	description="Gearbox number" ),
  *    				 @OA\Property(property="fuel_type", type="integer", example="1",	description="Fuel Type Number" )
  *          )
  *       )
  *     ),
  *  @OA\Response(response="200", description="Ad that has been added into database with ID assigned.")
  * )
  */
  Flight::route('POST /ads/add', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::adsservice()->add_ad($data));
  });



  /**
   * @OA\Put(path="/ads/{id}", tags={"advertisements"},
   *   @OA\Parameter(@OA\Schema(type="integer"), in="path", name="id", default=1),
   *   @OA\RequestBody(description="Advertise info updater.", required=true,
   *       @OA\MediaType(mediaType="application/json",
   *    			@OA\Schema(
   *    				 @OA\Property(property="title", required="true", type="string", example="Lada Mustang",	description="Advertisement's title" ),
   *    				 @OA\Property(property="description", type="string", example="Best car Ever!",	description="Advertisement's description" ),
   *    				 @OA\Property(property="model", type="string", example="11",	description="Car Model number" ),
   *    				 @OA\Property(property="car_body", required="true", type="integer", example="2",	description="Car Body Number" ),
   *    				 @OA\Property(property="fabricated", required="true", type="integer", example="2019",	description="Car Year of fabrication" ),
   *    				 @OA\Property(property="km", type="integer", example="125000",	description="Car's mileage" ),
   *    				 @OA\Property(property="price", type="integer", example="10000",	description="Car's price" ),
   *    				 @OA\Property(property="gearbox", type="integer", example="1",	description="Car's gearbox type number" ),
   *    				 @OA\Property(property="fuel_type", type="integer", example="1",	description="Car's fuel type number" )
   *          )
   *       )
   *     ),
   *     @OA\Response(response="200", description="Update account based on id")
   * )
   */
  Flight::route('PUT /ads/@id', function($id){
      $data = Flight::request()->data->getData();
      Flight::json(Flight::adsservice()->update_ad($id, $data));
  });

?>
