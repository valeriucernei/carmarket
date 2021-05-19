<?php
require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/AdsService.class.php";
require_once dirname(__FILE__)."/../dao/PhotosDao.class.php";
require_once dirname(__FILE__)."/../clients/CDNClient.class.php";

class PhotosService extends BaseService{

    private $CDNClient;

    public function __construct(){
        $this->dao = new PhotosDao();
        $this->adsService = new AdsService();
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

    public function upload($id, $data){
        if($this->adsService->get_ad_by_id($data['id'])['user_id'] != $id)
            throw new Exception("You don't have access to this ad.", 500);
        if(count($this->dao->get_ads_photos($data['id'])) >= 10)
            throw new Exception("Maximum number of photos per ad is 10.", 500);

        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $name = substr(str_shuffle($permitted_chars), 0, 16).'.png';

        try{
            parent::add([
                'ad_id' => $data['id'],
                'name' => $name
            ]);
        } catch(\Exception $e) {
            throw new Exception("Something went wrong with images upload.", 500, $e);
        }

        return $this->CDNClient->upload($name, $data['content']);
    }

}
