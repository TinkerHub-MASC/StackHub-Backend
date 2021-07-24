db.events.aggregate([{$project:{_id:0,year:{$year:"$date"},hour:{$hour:"$date"},minute:{$minute:"$date"}}},{$addFields:{ff:{$gte:["$year",new Date().getFullYear()]}}}])

db.events.aggregate([{$match:{"_id":ObjectId("60f9015b0ea21c0f881f116e")}},{$project:{totalSeat:1,booked:1,book:{$in:[ObjectId("60f7b2ac8987c813126ad4a5"),"$booked"]}}}]).pretty()

db.events.aggregate([{$addFields:{ff:{$gte:["$date",new Date()]}}}])

db.events.aggregate([{$addFields:{ff:{$gte:["$date",new Date()]}}},{$match:{"ff":true}},{$project:{year:{$year:"$date"},location:1}}])