<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once dirname(__FILE__)."/dao/UserDao.class.php";

  $user_dao = new UserDao();

  //$user = $user_dao->get_user_by_id("2");
  //$
  $user1 = [
    'username' => "test5646",
    'fname' => "ftest45",
    'lname' => "ltest2435u",
    'pass' => "123321",
    'email' => "pizdos6758@mail.com",
    'phone' => "+72848294",
    'reg_date' => "2021-03-14 14:40:30",
    'admin' => 1
];

$user69 = ['email' => 'pizda@mail.ru'];


$user = $user_dao->update_user_by_email("test@mail.ru", $user69);

print_r($user);


?>
