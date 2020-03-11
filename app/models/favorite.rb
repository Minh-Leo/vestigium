class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :article
  has_many :lists, through: :favorite_lists
end
