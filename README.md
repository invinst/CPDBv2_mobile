CPDBv2_mobile
--

# Local dev setup

## Backend

Pull backend repo, initialize & provision vagrant box:

```bash
git clone git@github.com:EastAgile/CPDBv2_backend.git
cd CPDBv2_backend
vagrant up --provision
# enter vault password when provisioning starts
```

SSH into the provisioned box and do whatever extra steps mentioned in backend
repo's README. As of now this means:

- Create initial data with `./cpdb/manage.py cms_create_initial_data`
- Import v2 actual data from csv dumps. Consult backend docs for details
- Disable supervisor application: `sudo supervisorctl stop cpdb`
- Start django devserver manually: `./cpdb/manage.py runserver 0.0.0.0:8000`

You should now have a backend server running at localhost:8000 .

## Mobile frontend

Unlike backend, we run the frontend devserver directly from host machine.

- Install `npm` v6 and latest `yarn` (0.27.5 as of now)
- Run `yarn install`
- Run `yarn run start` to start devserver at localhost:9967

If you want to access the dev site from another device through LAN, remember
to define your host machine's LAN IP as the API hostname. For example:

```bash
CPDB_API_HOST=192.168.13.37:8000 yarn run start
# replace 192.168.13.37 with your actual IP
```

# Testing:

User either `yarn run test:watch` or `yarn run mocha-watch` to start karma
server that reruns unit tests automatically on file save. The latter excludes
coverage report so you can see failed tests more easily.

Run `yarn run live-test` for end-to-end tests. Make sure you have java 8 and the
latest chromedriver. If on mac:

```bash
brew update
brew cask install java
brew install chromedriver  # or `brew upgrade chromedriver`
```

(we're using Chrome 59 with chromedriver 2.31 at the time of writing)

To run single live-test file:

```bash
yarn run live-test -- --file live-tests/test/complaint-page.spec.js  
# or
yarn run live-test -- --file complaint-page
```

# Misc

You should also `yarn run lint` before pushing. We strongly recommend setting up
eslint integration for your IDE or text editor.





