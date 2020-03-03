class Source < ApplicationRecord
  include PgSearch::Model
  multisearchable against: [:name]

  has_many :articles
  validates :name, presence: true
end
