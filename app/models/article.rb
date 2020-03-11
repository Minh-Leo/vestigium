class Article < ApplicationRecord
  after_initialize :set_defaults

  include PgSearch::Model
  pg_search_scope :search_by_title_and_description,
  against: [ :title, :description, :body],
  using: {
    tsearch: { prefix: true }
  }

  # multisearchable against: [:title, :description]

  validates :title, :url, :publish_time, presence: true
  belongs_to :source
  has_many :article_keywords
  has_many :keywords, through: :article_keywords

  def set_defaults
    self.description ||= ''
    self.title ||= 'No title'
  end

end
