# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all.as_json(include: { author: { only: %i[name] } })
    render_json({ posts: })
  end

  def create
    post = current_user.posts.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
    render
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
