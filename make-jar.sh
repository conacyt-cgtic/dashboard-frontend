rm -rf binary
mkdir -p binary/src/main/resources/assets
cp pom.xml binary/src
cp build/index.html binary/src/main/resources/assets
cp build/app.js binary/src/main/resources/assets
mvn -f binary/src/pom.xml deploy
echo "jar has been created !!!"


