class OpensocialGenerator < Rails::Generator::Base
  def manifest
    resources = 
    
    record do |m|
      m.directory 'app/controllers/feeds'
      m.directory 'app/controllers/feeds/activities'
      m.directory 'app/helpers/feeds'
      m.directory 'app/models/feeds'
      %w(people apps activities persistence shared instance activities/user).each do |resource|
        m.directory "app/views/feeds/#{resource}"
      end
      m.directory 'db/migrate'
      
      # Controllers
      m.file 'controllers/base_controller.rb', 'app/controllers/feeds/base_controller.rb'
      m.file 'controllers/apps_controller.rb', 'app/controllers/feeds/apps_controller.rb'
      m.file 'controllers/people_controller.rb', 'app/controllers/feeds/people_controller.rb'
      m.file 'controllers/persistence_controller.rb', 'app/controllers/feeds/persistence_controller.rb'
      m.file 'controllers/shared_controller.rb', 'app/controllers/feeds/shared_controller.rb'
      m.file 'controllers/instance_controller.rb', 'app/controllers/feeds/instance_controller.rb'
      m.file 'controllers/activities/user_controller.rb', 'app/controllers/feeds/activities/user_controller.rb'
      
      # Helpers
      m.template 'helpers/people_helper.rb', 'app/helpers/feeds/people_helper.rb'
      m.template 'helpers/persistence_helper.rb', 'app/helpers/feeds/persistence_helper.rb'
      
      # Models
      m.file 'models/app.rb', 'app/models/feeds/app.rb'
      m.file 'models/persistence.rb', 'app/models/feeds/persistence.rb'
      m.file 'models/shared.rb', 'app/models/feeds/shared.rb'
      m.file 'models/instance.rb', 'app/models/feeds/instance.rb'
      m.file 'models/global.rb', 'app/models/feeds/global.rb'
      m.file 'models/activity.rb', 'app/models/feeds/activity.rb'
      
      # Migrations
      m.migration_template 'create_open_social_container_dependencies.rb', 'db/migrate', :migration_file_name => 'create_open_social_container_dependencies'
      
      # Views
      %w(index edit new show).each do |action|
        m.file "views/apps/#{action}.html.erb", "app/views/feeds/apps/#{action}.html.erb"
      end
      m.file "views/people/show.xml.builder", "app/views/feeds/people/show.xml.builder"
      m.file "views/people/friends.xml.builder", "app/views/feeds/people/friends.xml.builder"
      m.file "views/shared/index.xml.builder", "app/views/feeds/shared/index.xml.builder"
      m.file "views/shared/show.xml.builder", "app/views/feeds/shared/show.xml.builder"
      m.file "views/instance/index.xml.builder", "app/views/feeds/instance/index.xml.builder"
      m.file "views/instance/show.xml.builder", "app/views/feeds/instance/show.xml.builder"
      m.file "views/persistence/global.xml.builder", "app/views/feeds/persistence/global.xml.builder"
      m.file "views/activities/user/show.xml.builder", "app/views/feeds/activities/user/show.xml.builder"
      
      m.dependency 'opensocial_assets', ['']
    end
  end
  
private
  def get_latest_migration_number
    Dir[File.join(Rails.root, 'db/migrate/*')].map{|name| File.basename(name)}.sort.last[/^([0-9]+)_/, 1].succ
  end
end