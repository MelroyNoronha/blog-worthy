# frozen_string_literal: true

class AddForeignKeysToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :user_id, :integer
    add_foreign_key :posts, :users, column: :user_id
    add_column :posts, :organization_id, :integer
    add_foreign_key :posts, :organizations, column: :organization_id
  end
end
