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
    title: "Weird Bunny Video", 
    body: "I told you it was weird", 
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

v1.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/sample-mov-file.mov"), filename: "sample-mov-file.mov")
v2.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Beach_Aerial_Footage_Taken_by_a_Drone.mp4"), filename: "Beach_Aerial_Footage_Taken_by_a_Drone.mp4")
v3.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Pexels_Videos_2519660.mp4"), filename: "Pexels_Videos_2519660.mp4")
v4.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Roller_Coaster.mp4"), filename: "Roller_Coaster.mp4")
v5.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(1).mp4"), filename: "video_(1).mp4")
v6.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(2).mp4"), filename: "video_(2).mp4")
v7.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(3).mp4"), filename: "video_(3).mp4")
v8.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video1.mov"), filename: "video1.mov")
v9.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/Hand_Washing_34091.mp4"), filename: "Hand_Washing_34091.mp4")
v10.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(5).mp4"), filename: "video_(5).mp4")
v11.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(6).mp4"), filename: "video_(6).mp4")
v12.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video.mp4"), filename: "video.mp4")
v13.video_file.attach(io: File.open("/Users/nickdraper/Desktop/example_videos/video_(4).mp4"), filename: "video_(4).mp4")

# THE BELOW IS FOR PRODUCTION ONLY attach sample video files to videos

# videoFile1 = URI.open('https://s3.amazonaws.com/ruby-reels-seeds/sample-mov-file.mov')
# videoFile2 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/Beach_Aerial_Footage_Taken_by_a_Drone.mp4')
# videoFile3 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/Pexels_Videos_2519660.mp4')
# videoFile4 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/Roller_Coaster.mp4')
# videoFile5 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(1).mp4')
# videoFile6 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(2).mp4')
# videoFile7 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(3).mp4')
# videoFile8 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video1.mov')
# videoFile9 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/Hand_Washing_34091.mp4')
# videoFile10 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(5).mp4')
# videoFile11 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(6).mp4')
# videoFile12 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video.mp4')
# videoFile13 = URI.open('https://ruby-reels-seeds.s3.amazonaws.com/video_(4).mp4')

# v1.video_file.attach(io: videoFile1, filename: "sample-mov-file.mov")
# v2.video_file.attach(io: videoFile2, filename: "Beach_Aerial_Footage_Taken_by_a_Drone.mp4")
# v3.video_file.attach(io: videoFile3, filename: "Pexels_Videos_2519660.mp4")
# v4.video_file.attach(io: videoFile4, filename: "Roller_Coaster.mp4")
# v5.video_file.attach(io: videoFile5, filename: "video_(1).mp4")
# v6.video_file.attach(io: videoFile6, filename: "video_(2).mp4")
# v7.video_file.attach(io: videoFile7, filename: "video_(3).mp4")
# v8.video_file.attach(io: videoFile8, filename: "video1.mov")
# v9.video_file.attach(io: videoFile9, filename: "Hand_Washing_34091.mp4")
# v10.video_file.attach(io: videoFile10, filename: "video_(5).mp4")
# v11.video_file.attach(io: videoFile11, filename: "video_(6).mp4")
# v12.video_file.attach(io: videoFile12, filename: "video.mp4")
# v13.video_file.attach(io: videoFile13, filename: "video_(4).mp4")

# destroy old likes and seed new ones

Like.destroy_all

l1 = Like.create!(is_like: false, liker_id: u2.id, likeable_type: "Video", likeable_id: v1.id)
l2 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v2.id)
l3 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v3.id)
l4 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v4.id)
l5 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v5.id)
l6 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v6.id)
l7 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v7.id)
l8 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v8.id)
l9 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v9.id)
l10 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v10.id)
l11 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v11.id)
l12 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v12.id)
l13 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Video", likeable_id: v13.id)

l14 = Like.create!(is_like: false, liker_id: u3.id, likeable_type: "Video", likeable_id: v1.id)
l15 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v2.id)
l16 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v3.id)
l17 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v4.id)
l18 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v5.id)
l19 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v6.id)
l20 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v7.id)
l21 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v8.id)
l22 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v9.id)
l23 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v10.id)
l24 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v11.id)
l25 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v12.id)
l26 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Video", likeable_id: v13.id)

l14 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v1.id)
l15 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v2.id)
l16 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v3.id)
l17 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v4.id)
l18 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v5.id)
l19 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v6.id)
l20 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v7.id)
l21 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v8.id)
l22 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v9.id)
l23 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v10.id)
l24 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v11.id)
l25 = Like.create!(is_like: false, liker_id: u4.id, likeable_type: "Video", likeable_id: v12.id)
l26 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Video", likeable_id: v13.id)

l37 = Like.create!(is_like: true, liker_id: u5.id, likeable_type: "Video", likeable_id: v1.id)
l38 = Like.create!(is_like: false, liker_id: u6.id, likeable_type: "Video", likeable_id: v1.id)
l39 = Like.create!(is_like: true, liker_id: u7.id, likeable_type: "Video", likeable_id: v1.id)
l40 = Like.create!(is_like: false, liker_id: u8.id, likeable_type: "Video", likeable_id: v1.id)
l41 = Like.create!(is_like: true, liker_id: u9.id, likeable_type: "Video", likeable_id: v1.id)
l41 = Like.create!(is_like: true, liker_id: u10.id, likeable_type: "Video", likeable_id: v1.id)

l41 = Like.create!(is_like: true, liker_id: u5.id, likeable_type: "Video", likeable_id: v2.id)
l42 = Like.create!(is_like: true, liker_id: u6.id, likeable_type: "Video", likeable_id: v2.id)
l43 = Like.create!(is_like: true, liker_id: u7.id, likeable_type: "Video", likeable_id: v2.id)
l44 = Like.create!(is_like: true, false: u8.id, likeable_type: "Video", likeable_id: v2.id)
l45 = Like.create!(is_like: true, liker_id: u9.id, likeable_type: "Video", likeable_id: v2.id)
l45 = Like.create!(is_like: true, liker_id: u10.id, likeable_type: "Video", likeable_id: v2.id)


# delete old comments and seed new ones

Comment.destroy_all

c1 = Comment.create!(content: "This video is super weird why did you post this", video_id: v1.id, author_id: u3.id)
c2 = Comment.create!(content: "Absolute nightmare fuel. I am not sleeping tn after watching this", video_id: v1.id, author_id: u4.id)

c4 = Comment.create!(content: "I once knew a guy who had a motorcycle like this", video_id: v2.id, author_id: u6.id)
c3 = Comment.create!(content: "WOAH, THATS A NICE MOTORCYCLE!", video_id: v2.id, author_id: u5.id)

c18 = Comment.create!(content: "Hm wow I never looked at it that way. Neat stuff.", video_id: v3.id, author_id: u7.id)
c19 = Comment.create!(content: "Like if you know ;)", video_id: v3.id, author_id: u7.id)

c20 = Comment.create!(content: "OMG SO CUTE!!! luv xxooxxoxox.", video_id: v4.id, author_id: u7.id)
c21 = Comment.create!(content: "Where was this!??", video_id: v4.id, author_id: u9.id)

c22 = Comment.create!(content: "I am scarred for life. I want my mom.", video_id: v1.id, author_id: u7.id, parent_id: c1.id)
c23 = Comment.create!(content: "I never knew I could feel such deep and penetrating fear from a video", video_id: v1.id, author_id: u8.id, parent_id: c2.id)
c24 = Comment.create!(content: "God help us all", video_id: v1.id, author_id: u9.id, parent_id: c2.id)

c25 = Comment.create!(content: "Wow that is wicked cool man", video_id: v2.id, author_id: u4.id, parent_id: c4.id)
c26 = Comment.create!(content: "OKAY, WOW OKAY NICE", video_id: v2.id, author_id: u9.id, parent_id: c3.id)
c27 = Comment.create!(content: "YEAH, THEY HAVE MOTORCYCLES", video_id: v2.id, author_id: u10.id, parent_id: c3.id)

c5 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v1.id, author_id: u1.id)
c6 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v2.id, author_id: u1.id)
c7 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v3.id, author_id: u1.id)
c8 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v4.id, author_id: u1.id)
c9 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v5.id, author_id: u1.id)
c10 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v6.id, author_id: u1.id)
c11 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v7.id, author_id: u1.id)
c12 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v8.id, author_id: u1.id)
c13 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v9.id, author_id: u1.id)
c14 = Comment.create!(content: "Hey! Demo user here with a nice demo comment. Try signing in and writing one of your own!", video_id: v10.id, author_id: u1.id)


l27 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c1.id)
l28 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c2.id)
l29 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c3.id)
l30 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c4.id)
l31 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c22.id)
l32 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c23.id)
l33 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c24.id)
l34 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c25.id)
l35 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c26.id)
l36 = Like.create!(is_like: true, liker_id: u1.id, likeable_type: "Comment", likeable_id: c27.id)

l37 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Comment", likeable_id: c1.id)
l38 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Comment", likeable_id: c1.id)
l39 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Comment", likeable_id: c1.id)
l40 = Like.create!(is_like: true, liker_id: u5.id, likeable_type: "Comment", likeable_id: c1.id)
l41 = Like.create!(is_like: true, liker_id: u6.id, likeable_type: "Comment", likeable_id: c1.id)

l41 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Comment", likeable_id: c2.id)
l42 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Comment", likeable_id: c2.id)
l43 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Comment", likeable_id: c2.id)
l44 = Like.create!(is_like: true, liker_id: u5.id, likeable_type: "Comment", likeable_id: c2.id)
l45 = Like.create!(is_like: true, liker_id: u6.id, likeable_type: "Comment", likeable_id: c2.id)

l46 = Like.create!(is_like: true, liker_id: u2.id, likeable_type: "Comment", likeable_id: c23.id)
l47 = Like.create!(is_like: true, liker_id: u3.id, likeable_type: "Comment", likeable_id: c23.id)
l48 = Like.create!(is_like: true, liker_id: u4.id, likeable_type: "Comment", likeable_id: c24.id)
l49 = Like.create!(is_like: true, liker_id: u5.id, likeable_type: "Comment", likeable_id: c24.id)
l50 = Like.create!(is_like: true, liker_id: u6.id, likeable_type: "Comment", likeable_id: c24.id)





View.destroy_all

View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)
View.create!(ip_address: 123, video_id: v1.id)

View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)
View.create!(ip_address: 123, video_id: v2.id)

View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)
View.create!(ip_address: 123, video_id: v3.id)

View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)
View.create!(ip_address: 123, video_id: v4.id)

View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)
View.create!(ip_address: 123, video_id: v5.id)

View.create!(ip_address: 123, video_id: v6.id)
View.create!(ip_address: 123, video_id: v6.id)
View.create!(ip_address: 123, video_id: v6.id)
View.create!(ip_address: 123, video_id: v6.id)
View.create!(ip_address: 123, video_id: v6.id)

View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)
View.create!(ip_address: 123, video_id: v7.id)

View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)
View.create!(ip_address: 123, video_id: v8.id)

View.create!(ip_address: 123, video_id: v9.id)
View.create!(ip_address: 123, video_id: v9.id)

View.create!(ip_address: 123, video_id: v10.id)
View.create!(ip_address: 123, video_id: v10.id)
View.create!(ip_address: 123, video_id: v10.id)
View.create!(ip_address: 123, video_id: v10.id)

View.create!(ip_address: 123, video_id: v11.id)
View.create!(ip_address: 123, video_id: v11.id)

View.create!(ip_address: 123, video_id: v12.id)
View.create!(ip_address: 123, video_id: v12.id)
View.create!(ip_address: 123, video_id: v12.id)
View.create!(ip_address: 123, video_id: v12.id)

View.create!(ip_address: 123, video_id: v13.id)
View.create!(ip_address: 123, video_id: v13.id)
View.create!(ip_address: 123, video_id: v13.id)
View.create!(ip_address: 123, video_id: v13.id)
View.create!(ip_address: 123, video_id: v13.id)
View.create!(ip_address: 123, video_id: v13.id)

