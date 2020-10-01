class EditCommentsAllowNilForVideoId < ActiveRecord::Migration[5.2]
  def change
    change_column :comments, :video_id, :integer, null: true
  end
end
