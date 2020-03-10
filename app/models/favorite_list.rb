class FavoriteList < ApplicationRecord
  belongs_to :list
  belongs_to :favorite
end
