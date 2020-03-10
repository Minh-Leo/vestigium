class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :photo
  has_many :favorites, dependent: :destroy
  has_many :lists, dependent: :destroy
  has_many :favorite_lists, through: :lists

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
