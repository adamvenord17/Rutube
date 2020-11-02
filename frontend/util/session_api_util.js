export const signup = (user) => {
    return $.ajax({
        method: "POST",
        url: "api/users",
        data: { user }
    });
};

export const login = (user) => {
    return $.ajax({
        method: "POST",
        url: "api/session",
        data: { user }
    });
};

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "api/session"
    });
};

export const fetchUser = (userId) => {
    if (userId) {
        return $.ajax({
            method: "GET",
            url: `api/users/${userId}`
        });
    }
};

export const editUser = user => {
    return $.ajax({
        method: "PATCH",
        url: `api/users/${user.id}`,
        data: { user }
    });
};