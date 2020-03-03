class Keyword < ApplicationRecord
  include PgSearch::Model
  multisearchable against: [:word]

  validates :word, presence: true
  has_many :articles, through: :article_keywords
end
