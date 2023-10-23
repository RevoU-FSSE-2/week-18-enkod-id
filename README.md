# Contoh repo untuk fullstack todolist dan sudah terupload ke firebase

## URL frontend

https://revou-project-example.web.app

## URL backend

https://us-central1-revou-project-example.cloudfunctions.net/todolistBE


## Reference firebase deploy: 

https://medium.com/boca-code/the-basic-process-is-that-we-will-use-firebase-cloud-functions-to-create-a-single-function-app-13ba3b852077#:~:text=The%20basic%20process%20is%20that,directed%20to%20our%20Express%20API

- npm i -g firebase-tools
- Bikin folder di pc masing2: example “todolist-revou”
- Bikin FE pakai npc create-react-app todolist-fe
- Bikin BE pakai express js boilerplate npx create-nodejs-express-app todolist-be
- Yarn install semua repo
- Bikin project di firebase console: example “todolist-revou-firebase”

## Di FE
- Yarn install
- Yarn build
- Firebase init hosting
- Existing project
- Rubah folder tujuan dari public ke build
- Hapus folder hidden .git dan file .gitignore



## Functions deploy
- rubah Nama folder generated from boilerplate jadi “functions” dan edit package.json nya sexual dengan folder functions yg generated dr firebase
- https://stackoverflow.com/questions/75969901/firebase-function-deployment-fails-with-missing-dependencies-error
- Turning node ke v16
- Downgrade firebase tools ke v11.17.0
- Ruby key PORT di semua file .env menjadi HOST, dan file yang memerlukan process.env.PORT dig anti ke process.env.HOST
- Add NODE_ENV=development di .env
- Rubah nama file di functions > index.js menjadi index-old.js, dan functions > app.js menjadi index.js