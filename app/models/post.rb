class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :upvotes, numericality: { greater_than_or_equal_to: :downvotes }
  validates_inclusion_of :is_blog_worthy, in: [true, false]
end
