package main

import (
	"backend/config"
	"backend/internal/app"
	"log"
)

func main() {
	// Load Config
	config.LoadConfig()

	// Setup App
	appInstance, err := app.NewApp()
	if err != nil {
		log.Fatalf("failed to setup the application: %s", err.Error())
		return
	}

	// Run Server
	err = appInstance.Run()
	if err != nil {
		log.Fatalf("failed to run the application: %s", err.Error())
		return
	}
}
