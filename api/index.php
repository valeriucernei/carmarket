<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/../vendor/autoload.php";
require_once dirname(__FILE__)."/dao/UserDao.class.php";

/**
 * Utility function for reading query parameters from URL
 * @param name of the parameter
 * @param default value (Default: NULL)
 */
Flight::map('query', function($name, $default_value = NULL){
  $request = Flight::request();

  $query_param = @$request->query->getData()[$name];
  $query_param = $query_param ? $query_param : $default_value;
  return $query_param;
});

Flight::register("userdao","UserDao");

require_once dirname(__FILE__)."/routes/users.php";

Flight::start();

?>
