class RenameSubscriberId < ActiveRecord::Migration[5.2]
  def change
    rename_column :subscriptions, :subscriber__id, :subscriber_id
  end
end
