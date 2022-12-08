<?php

class ProductController {
    private Product $product;
    public function __construct(Product $p) {
        $this->product = $p;
    }   

    public function processRequest(string $method): void {
        $this->handleCollection($method);
    }

    private function handleCollection(string $method) {
        switch ($method) {
            case "GET":
                echo json_encode($this->product->getProducts());
                break;
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $this->product->createProduct($data);
                http_response_code(201);
                echo json_encode([
                    "message" => "Product Was Created Successfully",
                ]);
                break;
            case "DELETE":
                $idArr = json_decode(file_get_contents("php://input"), true);
                if (!empty($idArr) && is_array($idArr)) {
                    $this->product->massDeleteProducts($idArr);
                    http_response_code(204);
                    echo json_encode([
                        "message" => "Product Was Deleted Successfully",
                    ]);
                }
                break;
            case "OPTIONS":
                http_response_code(200);
            default: 
                http_response_code(405); // Not Allowed  
        }
    }
}