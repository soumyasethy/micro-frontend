#!/usr/bin/env sh

# Trigger on rebuild of lib
# Copy to BlueLearn App ->  only for dev use
APP_PATH="../bluelearn-app/node_modules/@blue-learn/micro-frontend"
NO_CODE_PATH="../no-code-platform/node_modules/@blue-learn/micro-frontend"
[ -d $APP_PATH ] && cp -R $1 $APP_PATH/$1 && echo "👉 Watcher Copy @blue-learn/micro-frontend -> BlueLearn-App ✅ "
[ -d $NO_CODE_PATH ] && cp -R $1 $NO_CODE_PATH/$1 && echo "👉 Watcher Copy @blue-learn/micro-frontend -> NO_CODE_PATH ✅ "
