class Keyword < ApplicationRecord
  validates :word, presence: true
  has_many :articels, through: :article_keywords
end
