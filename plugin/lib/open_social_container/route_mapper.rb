#require 'action_controller/routing'
# require File.join(File.dirname(__FILE__), 'route_ext')
# require File.join(File.dirname(__FILE__), 'container_controller')

module OpenSocialContainer
  module RouteMapper
  	module_function
    def opensocial_container(domain)
      ::ActionController::Base.send(:define_method, :opensocial_container_url) do |app, owner, viewer, instance|
        owner_id = owner.is_a?(Numeric) ? owner : owner.id
        viewer_id = viewer.is_a?(Numeric) ? viewer : viewer.id
        sess = Base64.encode64(Marshal.dump([owner_id,
                viewer_id,
                instance,
                app.id,
                Time.now]))
        sig = Base64.encode64(sign_opensocial_session(sess))
        subdomain = "#{instance}"
        "http://#{subdomain}.#{domain}:#{request.port}/container?sess=#{URI.encode(sess).gsub('+', '%2b')}&sig=#{URI.encode(sig).gsub('+', '%2b')}"
      end
      ::ActionController::Base.send(:define_method, :opensocial_container_proxy_url) do |instance|
        "http://#{subdomain}.#{request.host}:#{request.port}/proxy"
      end
      ::ActionController::Base.send(:define_method, :opensocial_container_proxy_path) do
        "/proxy"
      end
      ::ActionController::Base.send :helper_method, :opensocial_container_url, :opensocial_container_proxy_url, :opensocial_container_proxy_path     
    end
  end
end

#ActionController::Routing::RouteSet::Mapper.send :include, OpenSocialContainer::RouteMapper