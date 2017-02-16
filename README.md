CPDBv2_mobile
--

# Quick notes:

- We still use mobile_v2 vagrant box. Will remove it later.
- Provision backend_v2 inside mobile_v2's vagrant box and `runserver` at port
  9000 inside it.
- Use `yarn` to install dependencies (see `circle.yml`) then run development
  server on host machine (= outside vagrant box) at port 9967.

# Testing:

User either `yarn run test:watch` or `yarn run mocha-watch` to start karma
server that reruns unit tests automatically on file save. The latter excludes
coverage report so you can see failed tests more easily.

Run `yarn live-test` for end-to-end tests. Make sure you have java 8 and the
latest chromedriver. If on mac:

```bash
brew update
brew cask install java
brew install chromedriver  # or `brew upgrade chromedriver`
```





