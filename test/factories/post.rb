# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Name.name }
    description { Faker::Internet.email }
    upvotes { 9 }
    downvotes { 6 }
    association :author, factory: :user
  end
end
