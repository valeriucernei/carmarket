<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once dirname(__FILE__)."/dao/UserDao.class.php";

  $user_dao = new UserDao();

  //$user = $user_dao->get_user_by_id("2");
  //$
  $user1 = [
    'username' => "test3",
    'fname' => "ftest3",
    'lname' => "ltest3",
    'pass' => "123321",
    'email' => "pizdostradanka228@mail.com",
    'phone' => "+72848294"
];

$user = $user_dao->add_user($user1);

  print_r($user);


?>
