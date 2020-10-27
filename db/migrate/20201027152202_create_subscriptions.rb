class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :creator_id, null: false
      t.integer :subscriber__id, null: false

      t.timestamps
    end

    add_index :subscriptions, [:creator_id, :subscriber__id], unique: true
  end
end
