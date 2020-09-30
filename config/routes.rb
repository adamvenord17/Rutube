# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#           api_user_videos GET    /api/users/:user_id/videos(.:format)                                                     api/videos#index {:default=>{:Format=>:json}}
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:default=>{:Format=>:json}}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:default=>{:Format=>:json}}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:default=>{:Format=>:json}}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:default=>{:Format=>:json}}
#            api_video_like POST   /api/videos/:video_id/like(.:format)                                                     api/videos#like {:default=>{:Format=>:json}}
#          api_video_unlike POST   /api/videos/:video_id/unlike(.:format)                                                   api/videos#unlike {:default=>{:Format=>:json}}
#         api_video_dislike POST   /api/videos/:video_id/dislike(.:format)                                                  api/videos#dislike {:default=>{:Format=>:json}}
#       api_video_undislike POST   /api/videos/:video_id/undislike(.:format)                                                api/videos#undislike {:default=>{:Format=>:json}}
#      api_video_changelike POST   /api/videos/:video_id/changelike(.:format)                                               api/videos#change_like {:default=>{:Format=>:json}}
#        api_video_comments GET    /api/videos/:video_id/comments(.:format)                                                 api/comments#index {:default=>{:Format=>:json}}
#                           POST   /api/videos/:video_id/comments(.:format)                                                 api/comments#create {:default=>{:Format=>:json}}
#                api_videos GET    /api/videos(.:format)                                                                    api/videos#index {:default=>{:Format=>:json}}
#                           POST   /api/videos(.:format)                                                                    api/videos#create {:default=>{:Format=>:json}}
#                 api_video GET    /api/videos/:id(.:format)                                                                api/videos#show {:default=>{:Format=>:json}}
#                           PATCH  /api/videos/:id(.:format)                                                                api/videos#update {:default=>{:Format=>:json}}
#                           PUT    /api/videos/:id(.:format)                                                                api/videos#update {:default=>{:Format=>:json}}
#                           DELETE /api/videos/:id(.:format)                                                                api/videos#destroy {:default=>{:Format=>:json}}
#               api_comment PATCH  /api/comments/:id(.:format)                                                              api/comments#update {:default=>{:Format=>:json}}
#                           PUT    /api/comments/:id(.:format)                                                              api/comments#update {:default=>{:Format=>:json}}
#                           DELETE /api/comments/:id(.:format)                                                              api/comments#destroy {:default=>{:Format=>:json}}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, default: {Format: :json} do
    resources :users, only: %i(create show) do
      resources :videos, only: %i(index)
    end
    resource :session, only: %i(create destroy)
    
    resources :videos, only: %i(index show create destroy update) do
      post :like, to: 'videos#like', as: 'like'
      post :unlike, to: 'videos#unlike', as: 'unlike'
      post :dislike, to: 'videos#dislike', as: 'dislike'
      post :undislike, to: 'videos#undislike', as: 'undislike'
      post :changelike, to: 'videos#change_like', as: 'changelike'

      resources :comments, only: %i(index create)
    end

    resources :comments, only: %i(destroy update)

  end

end
