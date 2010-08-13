SixComm::Application.routes.draw do
  OpenSocialContainer::RouteMapper.opensocial_container("6thsense.eu")
  namespace :feeds do
    resources :apps do
      resources :persistence, :collection => {:global => :get}, :member => {:friends => :get} do
        resources :shared
        resources :instance
      end
    end
    namespace :activities do
      resources :user
    end
    resources :people, :member => {:friends => :get}
  end

  get '/container', {:controller => 'open_social_container/container', :action => 'contain'}
  get '/proxy', {:controller => 'open_social_container/container', :action => 'proxy'}
end
