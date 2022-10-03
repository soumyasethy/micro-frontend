BUILD_PATH="lib"
echo "Copy voltmoney/micro-frontend ⏳ "

# 1.Copy to Volt App ->  only for dev use
APP_PATH="../volt-app/node_modules/voltmoney/micro-frontend"
[ -d $APP_PATH ] && rm -rf $APP_PATH/"lib" && echo "👉 Clear -> $APP_PATH/lib ✅ "
mkdir -p $APP_PATH/"lib" && echo "👉 Link -> $APP_PATH/lib ✅ " #&& cd .. #uncomment when run local
[ -d $APP_PATH ] && cp -R $BUILD_PATH $APP_PATH && echo "👉 Copy voltmoney/micro-frontend -> Volt-App ✅ "


#NO_CODE_PATH="../no-code-platform/node_modules/voltmoneymoney/micro-frontend"
#[ -d $NO_CODE_PATH ] && rm -rf $NO_CODE_PATH/"lib" && echo "👉 Clear -> $NO_CODE_PATH/lib ✅ "
#mkdir -p $NO_CODE_PATH/"lib" && echo "👉 Link -> $NO_CODE_PATH/lib ✅ " #&& cd .. #uncomment when run local
#[ -d $NO_CODE_PATH ] && cp -R $BUILD_PATH $NO_CODE_PATH && echo "👉 Copy voltmoneymoney/micro-frontend -> NO_CODE_PATH ✅ "
