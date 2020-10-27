export const subscribeTo = userId => {
    return(
        $.ajax({
            method: "POST",
            url: `/api/users/${userId}/subscribeto`
        })
    )
}

export const unsubscribeTo = userId => {
    return(
        $.ajax({
            method: "POST",
            url: `/api/users/${userId}/unsubscribeto`
        })
    )
}