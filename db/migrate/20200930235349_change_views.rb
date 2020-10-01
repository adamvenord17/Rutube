class ChangeViews < ActiveRecord::Migration[5.2]
  def change
    remove_column :views, :user_id
    add_column :views, :ip_address, :string, null: false
  end
end
