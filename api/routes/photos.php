<?php
/*SWAGGER documentation*/

/**
* @OA\Get(path="/photos/{token}", tags={"photos"},  description="Query to get photo ID",
*     @OA\Parameter(type="string", in="path", name="token", default="asd123", description="Image token (name)"),
*     @OA\Response(response="200", description="Photod ID")
* )
*/
Flight::route('GET /photos/@token', function($token){
    Flight::json(Flight::photosservice()->get_photo_id($token));
});

/*

Flight::rout('GET /photos/ad/@id', function($id){
    Flight::json(Flight::photosservice()->get_ads_photos($ad));
});*/
