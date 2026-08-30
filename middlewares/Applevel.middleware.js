const express = require("express");
const cors = require("cors");

// Apply all app-level middlewares
const AppMiddleware = (app) => {
    // Allow cross-origin requests from the frontend
    app.use(cors());

    // Parse incoming JSON request bodies
    app.use(express.json());

    // Parse URL-encoded form data
    app.use(express.urlencoded({ extended: true }));
};

module.exports = AppMiddleware;
