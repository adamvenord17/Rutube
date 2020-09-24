json.extract! video, :id, :title, :body, :video_file
json.video_file url_for(video.video_file)