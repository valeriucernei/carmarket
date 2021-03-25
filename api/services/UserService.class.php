<?php

require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/UserDao.class.php";

class UserService extends BaseService{
  public function __construct(){
    $this->dao = new UserDao();
  }



  public function get_users($search, $offset, $limit, $order){
    if($search){
      return $this->dao->get_users($search, $offset, $limit, $order);
    }else{
      return $this->dao->get_all($offset, $limit, $order);
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

    $user['pass'] = md5($user['pass']);
    $user['token'] = md5(random_bytes(16));
    try{
      $user = parent::add($user);
    } catch (\Exception $e){
      if(str_contains($e->getMessage(), 'users.username_UNIQUE'))
        throw new Exception("Account with same username exists in data base.", 400, $e);
      else if(str_contains($e->getMessage(), 'users.email_UNIQUE'))
        throw new Exception("Account with same email address exists in data base.", 400, $e);
      else throw $e;
    }

    //TODO email send with token

    return $user;
  }



  public function confirm($token){
    $user = $this->dao->get_user_by_token($token);
    if(!isset($user['id'])) throw new Exception("Invalid token.");
    $this->dao->update($user['id'], [
      "status" => "ACTIVE",
      "token" => NULL
    ]);

    //TODO send email that account has been approved.
  }





}
?>
