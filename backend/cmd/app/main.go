package main

import (
	"backend/internal/hello"
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	message := hello.SayHello()
	fmt.Fprintf(w, message)
}

func main() {
	http.HandleFunc("/hello", helloHandler)
	http.ListenAndServe(":8080", nil)
}
