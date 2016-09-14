Ansible Role: Node.js 4.x
=========

Basic role to install Node.js version 4.x on Debian/Ubuntu and do some configuration of npm.

Credits
-------

Substantially based on George Miroshnykov's role:
https://github.com/laggyluke/ansible-role-nodejs


Requirements
------------

None.

Usage
-----

Install globally with ansible's ```ansible-galaxy``` builtin:

``` sh
ansible-galaxy install Heroqu.nodejs4x
```

Alternatively: just git clone the whole repo to roles subdirectory inside your ansible project (my prefered way of doing it).

Example Playbook
----------------

``` yaml
- hosts: webserver
    roles:
      - Heroqu.nodejs4x
```

Role Variables
--------------

Available variables and their defaults specified in ```defaults/main.yml```:

#### Basic NPM configuration

One can specify any number of lines to be applied to ```~/.npmrc``` file:

``` yaml
nodejs4x:
  npmrc_lines:
  - { line: 'prefix=~/.npm-packages', state: 'present', regexp: '^prefix\s*=' }
```

The default configuration line is pointing NPM prefix to be inside **deploy user**'s home directory. This is to avoid *sudo*-ing when installing npm packages globally later on. With such a setup all the globally installed npm packages are going to land in ```~/.npm-packages``` directory. No root privileges are to be involved - neither during install nor afterwards - everything can be done under **deploy user**. And this should be good for security.

Any other options can be added to (or removed from - using ```state: 'absent'```) ~/.npmrc file in a similar way.

#### Deploy user (for npm configuration)

``` yaml
nodejs4x:
  deploy_user: '{{ ansible_ssh_user }}'
```

It is under this user's home directory that ```~/.npmrc``` file was created just above. The default value is the user under which ansible connects to the host. If you specify another user - make sure it is already there.

On the other hand if you are not adding any lines to ```~/.npmrc``` then this users is not used. All the basic install is done with sudo.

Dependencies
------------

None.

Disclaimer
------------

The role is only tested on Ubuntu/Trusty. Hope it should work with other Debian/Ubuntu distros that are physically visible at Nodesource.com repo directory structure:

``` shell
  https://deb.nodesource.com/node_4.x/dists/
    - wily/    
    - jessie/  
    - precise/
    - sid/     
    - trusty/  
    - vivid/   
    - wheezy/  
```

License
-------

BSD

Author Information
------------------

This role was created in 2015 by [Heroqu](https://github.com/heroqu). Comments are welcome.
