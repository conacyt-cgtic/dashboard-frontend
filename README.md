# crypto-frontend

Repo for our crypto app

We can run this thing just like this:



export SRC=/Users/garellano/Desktop/LAST-ONES
docker run -it -p 7777:8080 \
-v $SRC/frontend/src:/structure/src \
kebblar/crypto-trader bash /run.sh



Or.... just like this:



export SRC=/Users/garellano/Desktop/LAST-ONES
run-front.sh $SRC


Example:
~/Desktop/front/frontend$> ./run-front.sh /Users/garellano/Desktop/front
