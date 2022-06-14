npx ng build --configuration=production --output-path=/tmp/AgariAngular
rsync -r --delete-after --quiet /tmp/AgariAngular/ jinbijin@84.22.102.178:~/AgariAngular
echo 'Deployment successful!'
