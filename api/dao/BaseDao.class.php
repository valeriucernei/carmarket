<?php

require_once dirname(__FILE__)."/../config.php";

class BaseDao {
  protected $connection;

  private $table;

  public function __construct(){
    try {
      $this->connection = new PDO("mysql:host=".Config::DB_HOST.";dbname=".Config::DB_SCHEME.";port=".Config::DB_PORT, Config::DB_USERNAME, Config::DB_PASSWORD);
      $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
      throw $e;
    }

  }

  public function insert(){

  }

/**
 * Update query in database
 * @param  string $table     Table name
 * @param   $id        Search index (user ID, email...)
 * @param   $entity    User data
 * @param  string $id_column Optional: Column name (default= 'id')
 * @example update("users", $email, $user, "email");
 */
  public function update($table, $id, $entity, $id_column = "id"){
    $query = "UPDATE ${table} SET ";
    foreach($entity as $name => $value){
      $query .= $name." = :".$name.", ";
    }
    $query = substr($query, 0, -2);
    $query .= " WHERE ${id_column} = :id";
    $stmt = $this->connection->prepare($query);
    $entity['id'] = $id;
    $stmt->execute($entity);
  }

  public function query($query, $params){
    $stmt = $this->connection->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function query_unique($query, $params){
    $results = $this->query($query, $params);
    return reset($results);
  }


}
?>
