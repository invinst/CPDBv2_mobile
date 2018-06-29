# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.50.101"
  config.vm.network "forwarded_port", guest: 80, host: 9001

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
  end
end
