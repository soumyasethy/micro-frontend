BUILD_PATH="lib"
echo "Copy @micro-frontend ... ⏳ "

NO_CODE_PATH="../no-code-platform/node_modules/@voltmoney/micro-frontend"
[ -d $NO_CODE_PATH ] && rm -rf $NO_CODE_PATH/"lib" && echo "👉 Clear -> $NO_CODE_PATH/lib ✅ "
mkdir -p $NO_CODE_PATH/"lib" && echo "👉 Link -> $NO_CODE_PATH/lib ✅ "
[ -d $NO_CODE_PATH ] && cp -R $BUILD_PATH $NO_CODE_PATH && echo "👉 Copy @micro-frontend -> NO_CODE_PATH ✅ "
