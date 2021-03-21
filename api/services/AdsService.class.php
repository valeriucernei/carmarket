<?php

require_once dirname(__FILE__)."/BaseService.class.php";
require_once dirname(__FILE__)."/../dao/AdsDao.class.php";
require_once dirname(__FILE__)."/../dao/AtributesDao.class.php";

class AdsService extends BaseService{

  private $atributesDao;

  public function __construct(){
    $this->dao = new AdsDao();
    $this->atributesDao = new AtributesDao();
  }



  public function add_ad($data){
    if(!isset($data['title'])) throw new Exception("Title field is required.");
    if(!isset($data['car_body'])) throw new Exception("Car Body field is required.");
    if(!isset($data['fabricated'])) throw new Exception("Year field is required.");


    try{
        $this->dao->beginTransaction();
        $ad = parent::add([
            "user_id" => $data['user_id'],
            "title" => $data['title'],
            "description" => $data['description'],
            "model" => $data['model']
        ]);
        $atributes = $this->atributesDao->add([
            "car_body" => $data['car_body'],
            "fabricated" => $data['fabricated'],
            "km" => $data['km'],
            "price" => $data['price'],
            "gearbox" => $data['gearbox'],
            "fuel_type" => $data['fuel_type'],
            "ad_id" => 1
        ]);
        $this->dao->commit();
    } catch (\Exception $e) {
        $this->dao->rollBack();
        throw $e;
    }
    $this->atributesDao->update($atributes['id'], ["ad_id" => $ad['id']]);
    return $ad;
  }




}
?>
