<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class AtributesDao extends BaseDao{

  public function __construct(){
    parent::__construct("atributes");
  }

}
?>
