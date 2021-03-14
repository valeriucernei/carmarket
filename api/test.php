<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  //require_once dirname(__FILE__)."/dao/UserDao.class.php";
  require_once dirname(__FILE__)."/dao/AdsDao.class.php";

  //$user_dao = new UserDao();
  $ads_dao = new AdsDao();

  //$user = $user_dao->get_user_by_id("2");
  //$
  /*$user1 = [
    'username' => "tes675",
    'fname' => "fte54635",
    'pass' => "124535641",
    'email' => "pizdo93465645@mail.com",
    'phone' => "+727654435"
];*/

/*
$ads_dao->add([
  'user_id' => '2',
  'title' => 'Buggati in kuzov de BMW. Motor sprinter!',
  'description' => 'AXA Imobil vă propune spre vânzare teren agricol, amplasat în orașul Durlești'
]);*/

$ads_dao->update(3, [
  'user_id' => '8',
  'title' => 'Bhuinea',
  'description' => 'huinea desc'
]);


//$user = $user_dao->add_user($user1);




//$user69 = ['email' => 'pizda@mail.ru'];


//$user = $user_dao->update_user_by_email("test@mail.ru", $user69);

print_r($ads_dao);


?>
