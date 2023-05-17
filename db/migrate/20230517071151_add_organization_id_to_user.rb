# frozen_string_literal: true

class AddOrganizationIdToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :organization_id, :integer
    add_foreign_key :users, :organizations, column: :organization_id
  end
end
