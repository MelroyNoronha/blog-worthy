# frozen_string_literal: true

json.post do
  json.extract! @post,
    :id,
    :slug,
    :title,
    :description
end
