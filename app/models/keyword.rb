class Keyword < ApplicationRecord
  validates :word, presence: true
  has_many :articles, through: :article_keywords
end
