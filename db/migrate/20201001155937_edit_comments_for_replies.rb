class EditCommentsForReplies < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :parent_id, :integer
    change_column :comments, :video_id, :integer
  end
end
