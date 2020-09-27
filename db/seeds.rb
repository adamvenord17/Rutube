# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'open-uri'

# destroy old users and create new ones

User.destroy_all

u1 = User.create!({username: "DemoUser", email: "demo@demo.com", password: "password"})
u2 = User.create!({username: "adamvenord17", email: "adamvenord17@gmail.com", password: "password"})
u3 = User.create!({username: "paperboy1", email: "paperboy1@gmail.com", password: "password"})
u4 = User.create!({username: "magicman80", email: "magicman80@gmail.com", password: "password"})
u5 = User.create!({username: "kaitikay", email: "kaitikay@gmail.com", password: "password"})
u6 = User.create!({username: "trueSKILLZ", email: "trueSKILLS@gmail.com", password: "password"})
u7 = User.create!({username: "purpleRain12", email: "purpleRain12@gmail.com", password: "password"})
u8 = User.create!({username: "patriots12", email: "patriots12@gmail.com", password: "password"})
u9 = User.create!({username: "bigboy99", email: "bigboy99@gmail.com", password: "password"})
u10 = User.create!({username: "xxXsniprXxx", email: "xxXsniprXxx@gmail.com", password: "password"})

# destroy old videos and create new ones

Video.destroy_all

v1 = Video.create!({
    title: "Bunny Video", 
    body: "this is the body of the bunny video", 
    uploader_id: u1.id
})
v2 = Video.create!({
    title: "Areil Footage of a nice beach", 
    body: "Taking my new drone out for a test drive to take a look at the beach near my house", 
    uploader_id: u2.id
})
v3 = Video.create!({
    title: "EPIC motorcycle ride THROUGH THE WOODS", 
    body: "rippin and tearing through the woords. SUBSCIBE FOR MORE CONTENT LIKE THIS!!!", 
    uploader_id: u3.id
})
v4 = Video.create!({
    title: "Roller Coaster Ride", 
    uploader_id: u4.id
})
v5 = Video.create!({
    title: "Leafy Leaves", 
    body: "Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf, Leafy leaves leavo leafa leaf!", 
    uploader_id: u5.id
})
v6 = Video.create!({
    title: "Aerial View of a Street at night", 
    body: "Taking my new drone out for a test drive to take a look at the beach near my house", 
    uploader_id: u2.id
})
v7 = Video.create!({
    title: "Santa Chillin", 
    body: "I think someone gave santa the wrong cookies...", 
    uploader_id: u6.id
})
v8 = Video.create!({
    title: "Earth Spinning", 
    body: "video i took myself of the earth spinning lol XD", 
    uploader_id: u6.id
})
v9 = Video.create!({
    title: "How to wash your hands", 
    body: "Wash your hands you filthy animals we are in a pandemic. Here's how.", 
    uploader_id: u7.id
})
v10 = Video.create!({
    title: "America", 
    body: "A veiw of our flag from below", 
    uploader_id: u8.id
})
v11 = Video.create!({
    title: "Street Activity", 
    body: "A view from my street from ground level", 
    uploader_id: u9.id
})
v12 = Video.create!({
    title: "Screwing in a Lightbulb", 
    body: "Hey howarya", 
    uploader_id: u10.id
})
v13 = Video.create!({
    title: "My day on the beach!!!", 
    body: "What a beautiful day! Can you guess where I am??!!!?", 
    uploader_id: u5.id
})


# WARNING! ONLY ONE OF THESE NEXT TWO SECTIONS SHOULD BE ACTIVE WHEN SEEDING DATABASE
# MAKE SURE TO HAVE ONE SECTION COMMENTED OUT DEPENDING ON WHETHER YOU ARE SEEDING 
# A PRODUCTION DATABASE OR DEVELOPMENT DATABASE

# THE BELOW IS FOR DEVELOPMENT ONLY Attach sample video files to videos

# v1.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/sample-mov-file.mov"), filename: "sample-mov-file.mov")
# v2.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Beach_Aerial_Footage_Taken_by_a_Drone.mp4"), filename: "Beach_Aerial_Footage_Taken_by_a_Drone.mp4")
# v3.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Pexels_Videos_2519660.mp4"), filename: "Pexels_Videos_2519660.mp4")
# v4.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Roller_Coaster.mp4"), filename: "Roller_Coaster.mp4")
# v5.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(1).mp4"), filename: "video_(1).mp4")
# v6.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(2).mp4"), filename: "video_(2).mp4")
# v7.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(3).mp4"), filename: "video_(3).mp4")
# v8.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video1.mov"), filename: "video1.mov")
# v9.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Hand_Washing_34091.mp4"), filename: "Hand_Washing_34091.mp4")
# v10.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(5).mp4"), filename: "video_(5).mp4")
# v11.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(6).mp4"), filename: "video_(6).mp4")
# v12.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video.mp4"), filename: "video.mp4")
# v13.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(4).mp4"), filename: "video_(4).mp4")

# THE BELOW IS FOR PRODUCTION ONLY attach sample video files to videos

videoFile1 = open('https://s3.amazonaws.com/ruby-reels-seeds/sample-mov-file.mov')
videoFile2 = open('https://ruby-reels-seeds.s3.amazonaws.com/Beach_Aerial_Footage_Taken_by_a_Drone.mp4')
videoFile3 = open('https://ruby-reels-seeds.s3.amazonaws.com/Pexels_Videos_2519660.mp4')
videoFile4 = open('https://ruby-reels-seeds.s3.amazonaws.com/Roller_Coaster.mp4')
videoFile5 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(1).mp4')
videoFile6 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(2).mp4')
videoFile7 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(3).mp4')
videoFile8 = open('https://ruby-reels-seeds.s3.amazonaws.com/video1.mov')
videoFile9 = open('https://ruby-reels-seeds.s3.amazonaws.com/Hand_Washing_34091.mp4')
videoFile10 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(5).mp4')
videoFile11 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(6).mp4')
videoFile12 = open('https://ruby-reels-seeds.s3.amazonaws.com/video.mp4')
videoFile13 = open('https://ruby-reels-seeds.s3.amazonaws.com/video_(4).mp4')

# demo_user.avatar.attach(io: file, filename: 'some_file.jpg')

v1.video_file.attach(io: videoFile1, filename: "sample-mov-file.mov")
v2.video_file.attach(io: videoFile2, filename: "Beach_Aerial_Footage_Taken_by_a_Drone.mp4")
v3.video_file.attach(io: videoFile3, filename: "Pexels_Videos_2519660.mp4")
v4.video_file.attach(io: videoFile4, filename: "Roller_Coaster.mp4")
v5.video_file.attach(io: videoFile5, filename: "video_(1).mp4")
v6.video_file.attach(io: videoFile6, filename: "video_(2).mp4")
v7.video_file.attach(io: videoFile7, filename: "video_(3).mp4")
v8.video_file.attach(io: videoFile8, filename: "video1.mov")
v9.video_file.attach(io: videoFile9, filename: "Hand_Washing_34091.mp4")
v10.video_file.attach(io: videoFile10, filename: "video_(5).mp4")
v11.video_file.attach(io: videoFile11, filename: "video_(6).mp4")
v12.video_file.attach(io: videoFile12, filename: "video.mp4")
v13.video_file.attach(io: videoFile13, filename: "video_(4).mp4")
