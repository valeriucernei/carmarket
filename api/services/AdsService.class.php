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



  public function get_ads($search, $offset, $limit, $order, $car_body,
                          $fabricated_min, $fabricated_max, $km_min, $km_max,
                          $price_min, $price_max, $gearbox, $fuel_type){
    if($search){
      return $this->dao->get_ads($search, $offset, $limit, $order, $car_body,
                                $fabricated_min, $fabricated_max, $km_min, $km_max,
                                $price_min, $price_max, $gearbox, $fuel_type);
    }else{
      return $this->dao->get_all_ads($offset, $limit, $order, $car_body, $fabricated_min,
                                    $fabricated_max, $km_min, $km_max, $price_min,
                                    $price_max, $gearbox, $fuel_type);
    }
  }



  public function get_ad_by_id($id){
    return $this->dao->get_ad_by_id($id);
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
        if(str_contains($e->getMessage(), 'users.username_UNIQUE'))
          throw new Exception("Account with same username exists in data base.", 400, $e);
        throw $e;
    }
    $this->atributesDao->update($atributes['id'], ["ad_id" => $ad['id']]);
    return $ad;
  }



  public function update_ad($id, $data){
    if(!isset($data['title'])) throw new Exception("Title field is required.");
    if(!isset($data['car_body'])) throw new Exception("Car Body field is required.");
    if(!isset($data['fabricated'])) throw new Exception("Year field is required.");
    try{
        $this->dao->beginTransaction();
        $ad = parent::update($id, [
            "user_id" => $data['user_id'],
            "title" => $data['title'],
            "description" => $data['description'],
            "model" => $data['model']
        ]);

        $atr_id = $this->atributesDao->get_atributes_id($id);

        $atributes = $this->atributesDao->update($atr_id['id'], [
            "car_body" => $data['car_body'],
            "fabricated" => $data['fabricated'],
            "km" => $data['km'],
            "price" => $data['price'],
            "gearbox" => $data['gearbox'],
            "fuel_type" => $data['fuel_type']
        ]);
        $this->dao->commit();
    } catch (\Exception $e) {
        $this->dao->rollBack();
        if(str_contains($e->getMessage(), 'users.username_UNIQUE'))
          throw new Exception("Account with same username exists in data base.", 400, $e);
        throw $e;
    }
    return $this->dao->get_ad_by_id($id);
  }

}
?>
