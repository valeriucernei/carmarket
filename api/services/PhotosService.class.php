<?php
require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/PhotosDao.class.php";
require_once dirname(__FILE__)."/../clients/CDNClient.class.php";

class PhotosService extends BaseService{

    private $CDNClient;

    public function __construct(){
        $this->dao = new PhotosDao();
        $this->CDNClient = new CDNClient();
    }



    public function get_photo_id($token){
         $result = $this->dao->get_photo_id($token);
         if(!$result) throw new Exception("No image found with this token.", 404);
         return $result;
    }


    public function get_ads_photos($id){
        $result = $this->dao->get_ads_photos($id);
        return $result;
    }



    public function delete_photo($id){
        return parent::delete($id);
    }

    public function upload($data){
        return $this->CDNClient->upload($data['name'], $data['content']);
    }

}
