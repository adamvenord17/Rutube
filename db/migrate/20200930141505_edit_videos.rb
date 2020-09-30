class EditVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :searchable_title, :string
  end
end
