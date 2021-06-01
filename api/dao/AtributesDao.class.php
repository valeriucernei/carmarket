<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class AtributesDao extends BaseDao{

    public function __construct(){
        parent::__construct("atributes");
    }



    public function get_atributes_id($id){
        return $this->query_unique("SELECT id FROM atributes
                                    WHERE ad_id = :id", ["id" => $id]);
    }

    public function delete_atributes($ad_id){
        return $this->query_unique("DELETE FROM `carmarket`.`atributes`
                                    WHERE (`ad_id` = :ad_id);", 
                                    ["ad_id" => $ad_id]);
    }

}
