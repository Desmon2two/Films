const videos = [];

function create(videoData){
    const video = {
        id = uuid(),
        ...videoData
    }
videos.push(video)
return video;
};
function getbyID(id){
return videos.find(e => e.id === id)
};
function getAll(){
    return videos
}

function update(id, data){
    const index = videos.findIndex(v => {v.id === id})

    if (index === -1) return null;
    videos[index] = {
        ...videos[index],
        ...data
    };
    return videos[index]
};
function del(id){

        const index = videos.findIndex(v => {v.id === id})

    if (index === -1) return false;


    videos.splice(index, 1)

    return true
};

export default {create, getbyID, getAll, update, del}
