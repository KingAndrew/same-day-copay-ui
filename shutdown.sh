
#!/bin/bash

# Stop the application
echo "Shutting down the application..."

# Find and kill processes using port 3000 without using lsof
pid=$(netstat -nlp 2>/dev/null | grep ':3000 ' | awk '{print $7}' | cut -d'/' -f1)

if [ -n "$pid" ]; then
  echo "Killing process $pid using port 3000"
  kill -9 $pid 2>/dev/null || echo "Could not kill process directly"
else
  echo "No process found using port 3000"
  # Alternative backup method
  fuser -k 3000/tcp 2>/dev/null || echo "Could not use fuser to kill process"
fi

echo "Application has been shut down successfully."
