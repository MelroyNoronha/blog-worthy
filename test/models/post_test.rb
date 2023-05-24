# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = Organization.new(name: "Big Binary")
    @organization.save!

    @user = User.new(
      name: "Sam Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome", organization_id: @organization.id)
    @user.save!

    @post = Post.new(
      title: "Post title",
      description: "This is the post description.",
      user_id: @user.id,
      organization_id: @organization_id,
      upvotes: 2,
      downvotes: 1
    )
  end

  def test_post_should_not_be_saved_without_title
    @post.title = nil

    assert @post.invalid?
  end

  def test_post_should_not_be_saved_without_user_id_foreign_key
    @post.user_id = nil

    assert @post.invalid?
  end

  def test_slug_should_not_be_empty_after_post_is_saved
    @post.save!

    assert_not_nil @post.slug
  end

  def test_slug_should_be_unique
    @post.save!

    another_post = Post.new(
      title: "Another post title",
      description: "This is the post description.",
      user_id: @user.id,
      organization_id: @organization_id
    )
    another_post.save!

    assert_not_same @post.slug, another_post.slug
  end

  def downvotes_should_not_be_greater_than_upvotes
    @post.upvotes = 10
    @post.downvotes = 11

    assert @post.invalid?
  end

  def net_votes_should_be_difference_between_upvotes_and_downvotes
    @post.save!
    difference_between_upvotes_and_downvotes = @post.upvotes - @post.downvotes

    assert_equal @post.net_votes, difference_between_upvotes_and_downvotes
  end

  def is_blog_worthy_should_be_set_to_true_if_net_votes_greater_than_threshold
    @post.net_votes = POST::BLOG_WORTHY_THRESHOLD + 1
    @post.save!

    assert @post.is_blog_worthy
  end
end
