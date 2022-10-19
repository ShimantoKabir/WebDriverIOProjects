# Test Run CMD
	npm run wdio

# Run Specific Test File
	npx wdio run ./wdio.conf.js --spec example.e2e.js	

# Allure Report Generate CMD
	allure generate && allure open
	help Link: https://www.lambdatest.com/blog/webdriverio-html-reporter/#:~:text=Allure%20reporter%20is%20one%20of,most%20popular%20with%20Cucumber%20frameworks.
	
# IF command line doesn't recognize the allure
	npm install -g allure-commandline --save-dev

# Dependency injection install CMD
	npm i --save reflect-metadata tsyringe

# DB migration CMD
	npx typeorm-ts-node-commonjs migration:run -d data.source.ts

# To pass parameter to CMD
	npx wdio run test/wdio.conf.ts --suite desktop --customerId=7 --cardId=5
	
# Server run CMD
	nodemon api/index.ts
