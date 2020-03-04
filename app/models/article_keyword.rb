class ArticleKeyword < ApplicationRecord
  belongs_to :keyword
  belongs_to :article
end
