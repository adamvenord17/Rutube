# == Schema Information
#
# Table name: videos
#
#  id               :bigint           not null, primary key
#  title            :string           not null
#  body             :string
#  uploader_id      :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  searchable_title :string
#
class Video < ApplicationRecord

    validates :title, :uploader_id, presence: true

    after_validation :ensure_searchable_title

    belongs_to :uploader,
        foreign_key: :uploader_id,
        class_name: :User

    has_many :likes, as: :likeable

    has_many :comments,
        foreign_key: :video_id,
        class_name: :Comment

    has_one_attached :video_file

    has_many :views

    def liker_ids
        self.likes.where(is_like: true).select(:liker_id).map { |ele| ele.liker_id }
    end

    def disliker_ids
        self.likes.where(is_like: false).select(:liker_id).map { |ele| ele.liker_id }
    end

    def self.within_search_params(search_params)
        search_words = search_params.downcase.split(" ");
        main_results = []
        search_words.each { |word| main_results.concat(Video.where("videos.searchable_title LIKE '% #{word} %'"))}
        extra_results = []
        search_words.each { |word| extra_results.concat(Video.where("videos.searchable_title LIKE '%#{word}%'"))}
        main_results.concat(extra_results).uniq
    end

    def ensure_searchable_title
        self.searchable_title = ' ' + self.title.downcase + ' '
    end

    def num_views
        self.views.length
    end

end
