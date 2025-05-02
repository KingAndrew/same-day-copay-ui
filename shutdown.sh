#!/bin/bash

# Stop the application
echo "Shutting down the application..."

# Command to kill the process running on port 3000
lsof -ti:3000 | xargs kill -9

echo "Application has been shut down successfully."