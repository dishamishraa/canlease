curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

heroku login

docker build -t registry.heroku.com/$HEROKU_APP_NAME/web -f ./bff/Dockerfile.prod ./bff
docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
docker push registry.heroku.com/$HEROKU_APP_NAME/web

heroku config:set -a $HEROKU_APP_NAME \
    BACKEND_PORT=4000 \
    BFF_URL=$BFF_URL \
    FRONTEND_URL=$FRONTEND_URL \
    FRONTEND_DOMAIN=$FRONTEND_DOMAIN \
    SENDGRID_API_KEY=$SENDGRID_API_KEY \
    SENDGRID_FROM_EMAIL=$SENDGRID_FROM_EMAIL \
    SENDGRID_QUOTE_TEMPLATE_ID=$SENDGRID_QUOTE_TEMPLATE_ID \
    IDENTITY_URL=$IDENTITY_URL \
    DATA_URL=$DATA_URL \
    IDENTITY_SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME \
    BEARER_TOKEN=$BEARER_TOKEN \
    SALESFORCE_API_URL=$SALESFORCE_API_URL \

heroku container:release web -a $HEROKU_APP_NAME
