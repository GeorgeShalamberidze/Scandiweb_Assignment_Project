<?php
class Connection {
    private $host;
    private $dbname;
    private $user;
    private $pass;
    public function __construct($host, $dbname, $user, $pass)
    {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->user = $user;
        $this->pass = $pass;
    }

    public function connect() {
        try {
            // $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
            // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully";
            // return $conn;
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";
            return new PDO($dsn, $this->user, $this->pass, [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_STRINGIFY_FETCHES => false,
            ]);
        } catch(PDOException $e) {
            echo "CONN FAILED: " . $e->getMessage();
        }
    }
}