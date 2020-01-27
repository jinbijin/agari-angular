npx ng build --configuration=production --outputPath=/tmp/AgariAngular
rsync -r --delete-after --quiet /tmp/AgariAngular/ jinbijin@84.22.102.178:~/AgariAngular
echo 'Deployment successful!'
