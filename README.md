# Readme
### Install package
Run "yarn install"

### Execute playwright tests on BrowserStack
- Get username and access key from settings of BrowserStack
- Run following in terminal to set username and key at local env

```
export BROWSERSTACK_USERNAME=[xxxx]
export BROWSERSTACK_ACCESS_KEY=[xxxx]
```

Run command "yarn playwright test open --config=./playwright/playwright.ci.config.ts" 

Or

"yarn playwright-test"


