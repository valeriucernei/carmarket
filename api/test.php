<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once dirname(__FILE__)."/dao/UserDao.class.php";

  $user_dao = new UserDao();

  //$user = $user_dao->get_user_by_id("2");
  //$
  $user1 = [
    'username' => "test111",
    'fname' => "ftest45",
    'lname' => "ltest2435u",
    'pass' => "123321",
    'email' => "pizdostrad8@mail.com",
    'phone' => "+72848294",
    'reg_date' => "2021-03-14 14:40:30",
    'admin' => 1
];

$user = $user_dao->update_user(5, $user1);

  print_r($user);


?>
