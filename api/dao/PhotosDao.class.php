<?php
require_once dirname(__FILE__)."/BaseDao.class.php";

class PhotosDao extends BaseDao{

    public function __construct(){
        parent::__construct("photos");
    }

    public function get_ads_photos($id){
        return $this->query("SELECT * FROM photos WHERE ad_id = :id",
                            ["id" => $id]);
    }

    public function remove($filename){
        return parent::remove($filename);
    }

    public function delete_photos($ad_id){
        return $this->query_unique("DELETE FROM `carmarket`.`photos`
                                    WHERE (`ad_id` = :ad_id);",
                                    ["ad_id" => $ad_id]);
    }

}
