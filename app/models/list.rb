class List < ApplicationRecord
  belongs_to :user
  has_many :favorite_lists
  has_many :favorites, through: :favorite_lists

end
