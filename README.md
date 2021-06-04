# Rutube


<h3 style="text-align: center">Share, explore, and discover</h3>

# Table of Contents
1. Introduction
2. Features
3. Recent Updates
4. Technology
5. A closer look
    * Video Views
    * Smart Errors
6. Final Notes

# Introduction - At a glance

![rutube](https://user-images.githubusercontent.com/62521461/120765624-f941f300-c54b-11eb-84ef-3b6a0edcb7fe.png)

### Rutube, a YouTube clone, is a video-sharing platform where users can uplaod their own videos, as well as watch and express their opinions of other user videos through the medium of likes, dislikes, and comments.

### Rutube was engineered to be responsive, efficient, user-friendly, and fun to use.

<br></br>

# Features
### A few of the things you can do on Rutube:
* Watch videos
* Upload and manage your own videos
* Leave comments on videos
* Reply to comments
* Edit or delete your comment or reply
* Leave a like or a dislike on videos and comments
* Search videos by title using the search bar
* See specific users uploaded videos on their channel
* View your uploaded videos and videos you've liked on your channel, also update your account information

# Technology
### This is a fullstack application that was built using the following technologies:
* JavaScript
* React / Redux
* HTML / CSS
* Ruby
* Rails
* Postgres

# A closer look
### I want to take a closer look at a few features included in the development of Rutube.

## Video Views
At first, I was going to assign a video a view everytime it was played, but I realized that it could lead to unrealistic numbers if users were to spam the play button or refresh their page rapidly.

To combat this I thought about checking the last time a user had viewed a specific video by implementing a joins table with foreign keys pointing to `user_id` and `video_id`. The view would only be created if the `created_at` of the last view of that video by that user was more than 30 seconds ago. This worked, however it wouldn't count views for non-logged in users. 

I got past this issue by replacing the `user_id` column with `ip_address`, and instead checking the last time that the ip address watched the video. This makes the video count number even more secure, as malicious users could have had multiple accounts set up in one place to bump up a video's view count.

Now, a video will have a safer, consistant, and more accurate view count.

```Ruby
# videos_controller.rb

    def add_view
        last_view = View.where(ip_address: request.remote_ip).where(video_id: params[:video_id])
        if last_view[0]
            if ((Time.now - last_view.last.created_at) > 30)
                @view = View.new(ip_address: request.remote_ip, video_id: params[:video_id])
                if @view.save
                    redirect_to api_video_url(params[:video_id])
                else
                    render json: @view.errors.full_messages, status: :unprocessable_entity
                end
            end
        else
            @view = View.new(ip_address: request.remote_ip, video_id: params[:video_id])
            if @view.save
                redirect_to api_video_url(params[:video_id])
            else
                render json: @view.errors.full_messages, status: :unprocessable_entity
            end
        end
    end

```

## Smart Errors
I wanted logging in and signing up to Rutube to feel easy, smooth, and effortless. I wanted to make sure that the user knew exactly what was going on if they had a failed sign in or log in, so made sure to receive errors from my backend and update my state with them so I would be able to present the specific errors to my users.

I also knew that in signup, there are multiple fields that can be invalid. To make it clear which fields are erroring out, I made sure that the specific input that was invalid would light up red to tell the user that is the field that has something wrong with it, and the descriptive error message is displayed right below it.

With lots of experience being a user myself, I know that I need to present information as clearly as possible to the user and leave nothing up to speculation.

## The Like Bar
One thing that I just think is really cool is the like bar for video likes. I wanted mine to function how it does on YouTube, how it shows the proportion of likes to dislikes, and then highlights it blue if you like it. I thought it was a cool, interesting little feature that was fun to implement that looks really clean and adds a lot to the feel of the website.

```Javascript
// video_show.jsx

    getLikeProportion() {
        let numLikes = this.props.currentVideo.likerIds.length;
        let totalNum = this.props.currentVideo.likerIds.length + this.props.currentVideo.dislikerIds.length;
        let result = (numLikes / totalNum) * 100;
        if (result === NaN) {
            return '50%';
        } else {
            return `${result}%`;
        }
    }

    getDislikeProportion() {
        let numDislikes = this.props.currentVideo.dislikerIds.length;
        let totalNum = this.props.currentVideo.likerIds.length + this.props.currentVideo.dislikerIds.length;
        let result = (numDislikes / totalNum) * 100;
        if (result === NaN) {
            return `50%`;
        } else {
            return `${result}%`;
        }
    }

```
After recieving the proportions, I set the inline styling to `width: ${proportion}%` of the two divs in the like-bar, with a transition property to give it the smooth glide. 
```Javascript
// video_show.jsx
// in the render() method, before the return

    // sets up proportions for the likebar, using inline react styling
        let likeBarStyle = '';
        let dislikeBarStyle = '';
        if (this.props.currentVideo) {
            likeBarStyle = {
                width: this.getLikeProportion()
            }
            dislikeBarStyle = {
                width: this.getDislikeProportion()
            }
        }
```
```Javascript
// video_show.jsx
// this is jsx in the return method of the render()

    <div id="like-dislike-bar-container">
        <div id="like-bar" style={likeBarStyle}></div>
        <div id="dislike-bar" style={dislikeBarStyle}></div>
    </div>
```

## What I plan to implement:
* Subscriptions ✅
  * Users can subscribe to other users
  * User pages (channels) where the owner can edit their page and manage their videos. Other users can view it to see all the owners videos and content
* Video Tags ✅
   * Users can tag their videos to a certain category (funny, scary, vlog, etc)
* Filters
  * Filter search results by different attributes like length, views, likes, etc
  * Filter comments by likes, reply count, age, etc
* Search results
  * Be able to search and receive users as well as videos
