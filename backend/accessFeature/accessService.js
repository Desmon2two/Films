function checkAccess(user, video){

        if((user === usersBanned.find(user)) || (video === videosBanned.find(video))) return result.allowed = false;

    return result.allowed = true;

}