# frozen_string_literal: true

json.post do
  json.extract! @post,
    :id,
    :slug,
    :title,
    :description

  json.author do
    json.extract! @post.author,
      :name
  end
end
