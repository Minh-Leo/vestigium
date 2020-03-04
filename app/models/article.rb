class Article < ApplicationRecord
  after_initialize :set_defaults

  include PgSearch::Model
  multisearchable against: [:title, :description]

  validates :title, :url, :publish_time, presence: true
  belongs_to :source
  has_many :keywords, through: :article_keywords

  def set_defaults
    self.description ||= ''
    self.title ||= 'No title'
  end

end
