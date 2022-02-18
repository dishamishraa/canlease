rm -rf ./build/config.js
touch ./build/config.js

echo "\
window.env = { \
    REACT_APP_DOMAIN: '$REACT_APP_DOMAIN', \
    REACT_APP_BFF_URL: '$REACT_APP_BFF_URL', \
    REACT_APP_FRONTEND_URL: '$REACT_APP_FRONTEND_URL', \
    REACT_APP_GTM_ID: '$REACT_APP_GTM_ID', \
    REACT_APP_SESSION_COOKIE_NAME: '$REACT_APP_SESSION_COOKIE_NAME', \
}" >> ./build/config.js
