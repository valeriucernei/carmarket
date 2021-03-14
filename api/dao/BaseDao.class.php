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


  /**
 * Insert function into database
 * @param  $table  Table name
 * @param  $entity User Data
 * @return $entity        Return user Data with ID
 */
  public function insert($table, $entity){
    $query = "INSERT INTO ${table}"."(";
    foreach($entity as $name => $value){
      $query .= $name.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ") VALUES (";
    foreach($entity as $name => $value){
      $query .= ":".$name.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ")";

    $stmt = $this->connection->prepare($query);
    $stmt->execute($entity);
    $entity['id'] = $this->connection->lastInsertId();
    return $entity;
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

  /**
 * Return array with all data regardling query
 * @param  $query  SQL Query
 * @param   $params Parameters inside a Query
 * @return [type]         Return array with all data regardling query
 */
  public function query($query, $params){
    $stmt = $this->connection->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
 * Return unique array regardling query
 * @param  [type] $query  SQL Query
 * @param  [type] $params Parameters inside a Query
 * @return [type]         Return unique array regardling query
 */
  public function query_unique($query, $params){
    $results = $this->query($query, $params);
    return reset($results);
  }


}
?>
