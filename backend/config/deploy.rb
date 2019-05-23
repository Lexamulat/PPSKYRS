set :stages, %w(dev testing release) # тут указываем версии сборок, test использовать нельзя, поэтому testing
set :default_stage, "dev"
set :stage_dir,     "config/deploy"
require "capistrano/ext/multistage"
 
set :default_environment, {
    'BUILD_NUMBER' => ENV['BUILD_NUMBER'],
    'CI' => 'true',
    'NODE_ENV' => 'production'
}