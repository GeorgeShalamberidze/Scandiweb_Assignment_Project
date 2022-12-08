<?php

class Product {
    private PDO $conn;
    private $tableName = "products";

    public function __construct(Connection $dataBase) {
        $this->conn = $dataBase->connect();
    }

    public function getProducts(): array {
        $sql = "SELECT * FROM $this->tableName";

        $stmt = $this->conn->query($sql);
        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        };

        return $data;
    }

    public function createProduct(array $data): string {
        $sql = "INSERT INTO products (sku, name, price, productType, height, width, length, size, weight) VALUES (:sku, :name, :price, :productType, :height, :width, :length, :size, :weight)"; 

        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":sku", $data["sku"], PDO::PARAM_STR);
        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":price", $data["price"], PDO::PARAM_INT);
        $stmt->bindValue(":productType", $data["productType"], PDO::PARAM_STR);
        $stmt->bindValue(":height", $data["height"], PDO::PARAM_INT);
        $stmt->bindValue(":width", $data["width"], PDO::PARAM_INT);
        $stmt->bindValue(":length", $data["length"], PDO::PARAM_INT);
        $stmt->bindValue(":size", $data["size"], PDO::PARAM_INT);
        $stmt->bindValue(":weight", $data["weight"], PDO::PARAM_INT);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function massDeleteProducts(array $ids): string {
        $sql = "";
        if (!empty($ids) && is_array($ids)) {
            $sql .= " WHERE";
            $i = 0;
            foreach($ids as $value) {
                $i++;
                $query = "DELETE FROM " . "$this->tableName" .$sql. " $this->tableName" . "." . "id = " . $value;
                $stmt = $this->conn->prepare($query);

                $stmt->execute();
            }
        return $stmt->rowCount();
        } 
    }
}