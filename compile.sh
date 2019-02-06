export RUTA=/home/gustavo/development/crypto-code
rm -rf $RUTA/front-jar/src/main/resources/assets
mkdir $RUTA/front-jar/src/main/resources/assets

docker run -it -p 7777:8080 \
-v $RUTA/frontend/src:/structure/src \
-v $RUTA/front-jar/src/main/resources/assets:/structure/dist \
kebblar/crypto-trader bash /run.sh

mvn -f $RUTA/front-jar/pom.xml install

