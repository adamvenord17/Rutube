class ChangeLikesTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :likes, :is_like?, :is_like
  end
end
