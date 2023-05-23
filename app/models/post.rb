# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  BLOG_WORTHY_THRESHOLD = 10

  belongs_to :author, foreign_key: "user_id", class_name: "User"
  has_one :associated_organization, foreign_key: "organization_id", class_name: "Organization"

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :upvotes, numericality: { greater_than_or_equal_to: :downvotes }
  validates_inclusion_of :is_blog_worthy, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      title_slug = title.parameterize
      latest_post_slug = Post.where(
        "slug REGEXP ?",
        "^#{title_slug}$|^#{title_slug}-[0-9]+$",
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("post.slug.immutable"))
      end
    end
end
