<?php

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
?>
