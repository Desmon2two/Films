import mongoDB from "MongoDB"

mongoDB.find((data)=>{
    const result = [{$match: {
        views: 1, comments = 1
    }}, {$project: {views: 1, engagement: likes + comments}}]
return result
})