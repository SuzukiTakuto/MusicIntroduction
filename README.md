### first
docker-compose build --no-cache
docker-compose run --rm react sh -c "yarn create react-app frontend --template typescript"

### 
docker-compose up -d
docker-compose down