class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.string :body
      t.integer :uploader_id, null: false

      t.timestamps
    end

    add_index :videos, :uploader_id
  end
end
