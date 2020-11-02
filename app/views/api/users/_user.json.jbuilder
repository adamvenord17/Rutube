json.extract! user, :id, :username, :email
json.subscriptionIds user.subscription_ids
json.subscriberCount user.subscriber_count
json.dateJoined user.created_at