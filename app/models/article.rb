class Article < ApplicationRecord
  validates :title, :description, :url, :publish_time, presence: true
  belongs_to :source
  has_many :keywords, through: :article_keywords
end
