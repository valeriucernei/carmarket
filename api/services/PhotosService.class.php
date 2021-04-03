<?php
require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/PhotosDao.class.php";

class PhotosService extends BaseService{

    public function __construct(){
        $this->dao = new PhotosDao();
    }



    public function get_photo($id){

    }


    public function get_ads_photos($id){
      
    }
