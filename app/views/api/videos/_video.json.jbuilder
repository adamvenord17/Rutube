json.id video.id
json.title video.title
json.body video.body
json.uploaderId video.uploader_id
json.videoUrl url_for(video.video_file)
json.uploadDate video.created_at