docker build -t $IMAGE_NAME_FE:latest -f ./frontend/Dockerfile.prod ./frontend

docker run \
    -e FRONTEND_PORT=3000 \
    -e REACT_APP_DOMAIN=$DOMAIN \
    -e REACT_APP_BFF_URL=$BFF_URL \
    -e REACT_APP_FRONTEND_URL=$FRONTEND_URL \
    -e REACT_APP_SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME \
    -e NETLIFY_APP_ID=$NETLIFY_ADMIN_APP_ID \
    -e NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN \
    $IMAGE_NAME_FE:latest sh netlifyDeploy.sh
