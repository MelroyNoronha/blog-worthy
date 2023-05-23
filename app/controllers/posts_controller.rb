# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update]
  after_action :calculate_net_votes_and_set_is_blog_worthy, only: :update

  def index
    posts = Post.all.select { |post| post.author.organization_id == current_user.organization_id }
    render_json({ posts: posts.as_json(include: { author: { only: %i[name] } }) })
  end

  def create
    post = current_user.posts.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render
  end

  def update
    @post.update!(post_params)
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :upvotes, :downvotes)
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def calculate_net_votes
      @post.upvotes - @post.downvotes
    end

    def is_blog_worthy(net_votes)
      if net_votes > Post::BLOG_WORTHY_THRESHOLD
        true
      elsif net_votes <= Post::BLOG_WORTHY_THRESHOLD
        false
      end
    end

    def calculate_net_votes_and_set_is_blog_worthy
      net_votes = calculate_net_votes()
      is_blog_worthy = is_blog_worthy(net_votes)

      @post.update!(net_votes:, is_blog_worthy:)
    end
end
