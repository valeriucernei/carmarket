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
                          $price_min, $price_max, $gearbox, $fuel_type, $motor_size_min, $motor_size_max){
    if($search){
      return $this->dao->get_ads($search, $offset, $limit, $order, $car_body,
                                $fabricated_min, $fabricated_max, $km_min, $km_max,
                                $price_min, $price_max, $gearbox, $fuel_type, $motor_size_min, $motor_size_max);
    }else{
      return $this->dao->get_all_ads($offset, $limit, $order, $car_body, $fabricated_min,
                                    $fabricated_max, $km_min, $km_max, $price_min,
                                    $price_max, $gearbox, $fuel_type, $motor_size_min, $motor_size_max);
    }
  }



  public function get_ad_by_id($id){
    $result = $this->dao->get_ad_by_id($id);
    if(!$result) throw new Exception("This ad doesn't exist.", 404);
    else return $this->dao->get_ad_by_id($id);
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
            "motor_size" => $data['motor_size'],
            "ad_id" => 1
        ]);
        $this->dao->commit();
    } catch (\Exception $e) {
        $this->dao->rollBack();
        throw new Exception("Something went wrong! Ad has not been added. Please, try again.", 400, $e);
    }
    $this->atributesDao->update($atributes['id'], ["ad_id" => $ad['id']]);
    return $this->dao->get_ad_by_id($ad['id']);
  }



  public function update_ad($id, $data){

    if(!isset($data['title'])) throw new Exception("Title field is required.");
    if(!isset($data['car_body'])) throw new Exception("Car Body field is required.");
    if(!isset($data['fabricated'])) throw new Exception("Year field is required.");
    try{
        $this->dao->beginTransaction();
        $ad = $this->dao->update($id, [
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
            "fuel_type" => $data['fuel_type'],
            "motor_size" => $data['motor_size']
        ]);
        $this->dao->commit();
    } catch (\Exception $e) {
        $this->dao->rollBack();
        throw new Exception("Something went wrong! Ad has not been updated. Please, try again.", 400, $e);
    }
    return $this->dao->get_ad_by_id($id);
  }

}
?>
