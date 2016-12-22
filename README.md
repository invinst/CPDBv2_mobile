CPDBv2_mobile
--

Quick notes:

- We still use mobile_v2 vagrant box. Will remove it later.
- Provision backend_v2 inside mobile_v2's vagrant box and `runserver` at port
  9000 inside it.
- Use `yarn` to install dependencies (see `circle.yml`) then run development
  server on host machine (= outside vagrant box) at port 9966.




