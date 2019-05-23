# Менять только тут - имя папки с приложением в /var/nodejs
set :application, "quemonster_demo"

set :domain,      "wowzademo.fora-soft.com"
#default_run_options[:pty] = true
set :deploy_to,   "/var/nodejs/#{application}"
set :shared_children, %w(log node_modules)

# SCM info
set :repository,  "."
set :scm,         :none
set :deploy_via,  :copy
set :copy_exclude, [".git/*"]

role :app,        domain                         # This may be the same as your `Web` server

# General config stuff
set :keep_releases,  5
after "deploy:update", "deploy:cleanup"

# Confirmations will not be requested from the command line.
set :interactive_mode, false

# The following line tells Capifony to deploy the last Git tag.
# Since Jenkins creates and pushes a tag following a successful build this should always be the last tested version of the code.
set :branch, 'release'

# User details for the production server
set :user, "jenkins"
set :use_sudo, false
ssh_options[:forward_agent] = true

# Uncomment this if you need more verbose output from Capifony
logger.level = Logger::MAX_LEVEL

after 'deploy:finalize_update' do
    run "cd #{latest_release} && npm install"
end

after "deploy:create_symlink" do
    run "/usr/local/bin/nodeup2 restart #{application}"
end
