<?php

require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/UserDao.class.php";

class AdsService extends BaseService{
  public function __construct(){
    $this->dao = new AdsDao();
  }

}

?>
