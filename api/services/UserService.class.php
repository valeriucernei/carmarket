<?php

require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/UserDao.class.php";

class UserService extends BaseService{
  public function __construct(){
    $this->dao = new UserDao();
  }

  public function get_users($search, $offset, $limit){
    if($search){
      return $this->dao->get_users($search, $offset, $limit);
    }else{
      return $this->dao->get_all($offset, $limit);
    }
  }


  public function add($user){
    if(!isset($user['username'])) throw new Exception("ERROR! Username is missing.");

    $user['status'] = 'ACTIVE';
    return parent::add($user);
  }


  public function register($user){
    if(!isset($user['username'])) throw new Exception("Username field is required.");
    if(!isset($user['email'])) throw new Exception("Email field is required.");
    if(!isset($user['fname'])) throw new Exception("First Name field is required.");
    if(!isset($user['pass'])) throw new Exception("Password field is required.");
    if(!isset($user['phone'])) throw new Exception("Phone field is required.");

    try{
      $user['pass'] = md5($user['pass']);
      $user['token'] = md5(random_bytes(16));
      $user = parent::add($user);
    } catch(\Exception $e) {
      // rollback
      throw $e;
    }

    //TODO email send with token

    return $user;
  }

  public function confirm($token){
    $user = $this->dao->get_user_by_token($token);
    if(!isset($user['id'])) throw Exception("Invalid token.");

    $this->dao->update($user['id'], [
      "status" => "ACTIVE",
      "token" => NULL
    ]);

    //TODO send email that account has been approved.
  }







}

?>
