class CreateTagJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_joins do |t|
      t.integer :video_id, null: false
      t.integer :tag_id, null: false

      t.timestamps
    end

    add_index :tag_joins, [:tag_id, :video_id], unique: true
  end
end
