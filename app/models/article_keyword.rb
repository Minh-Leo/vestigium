class ArticleKeyword < ApplicationRecord
  belongs_to :keywords
  belongs_to :articles
end
