export const fetchTags = () => {
    return(
        $.ajax({
            method: "GET",
            url: "api/tags"
        })
    )
}

export const fetchTag = (tagId) => {
    return(
        $.ajax({
            method: "GET",
            url: `api/tags/${tagId}`
        })
    )
}
