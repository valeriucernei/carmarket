<?php
/*SWAGGER documentation*/

/**
* @OA\Get(path="/photos/{token}", tags={"photos"},  description="Query to get photo ID",
*     @OA\Parameter(type="string", in="path", name="token", default="asd123", description="Image token (name)"),
*     @OA\Response(response="200", description="Photo ID")
* )
*/
Flight::route('GET /photos/@token', function($token){
    Flight::json(Flight::photosservice()->get_photo_id($token));
});



/**
* @OA\Get(path="/photos/ad/{id}", tags={"photos"},  description="Query to get all photos of an ad",
*     @OA\Parameter(type="integer", in="path", name="id", default="1", description="Ad ID"),
*     @OA\Response(response="200", description="Photo ID")
* )
*/
Flight::route('GET /photos/ad/@id', function($id){
    Flight::json(Flight::photosservice()->get_ads_photos($id));
});

/**
* @OA\Post(path="/user/photos/add", tags={"photos", "x-user"}, description="Query for uploading a photo to CDN", security={{"ApiKeyAuth": {}}},
*   @OA\RequestBody(description="Upload file to CDN", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    			   @OA\Property(property="id", required="true", type="integer", example="1",	description="ID of the AD" ),
*    				 @OA\Property(property="content", required="true", type="string", example="base64",	description="Base64 content encoded" )
*          )
*       )
*     ),
*  @OA\Response(response="200", description="File uploaded to CDN.")
* )
*/
Flight::route('POST /user/photos/add', function(){
    Flight::json(["url" => Flight::photosservice()->upload(Flight::get('user')['id'], Flight::request()->data->getData())]);
});
