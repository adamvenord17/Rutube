class CreateLikesDislikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.boolean :is_like?, null: false
      t.integer :liker_id, null: false

      t.references :likeable, polymorphic: true

      t.timestamps 
    end

    add_index :likes, [:liker_id, :likeable_id, :likeable_type], unique: true
  end
end
