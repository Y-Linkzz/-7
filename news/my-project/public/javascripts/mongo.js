const {
    MongoClient,
    ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = '1812';
// Use connect method to connect to the server

let connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err)
            } else {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                resolve({
                    db,
                    client
                })
            }
        });
    })
}

let insert = (col, arr) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.insertMany(arr, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
                client.close();
            }
        })
    })
}

let find = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs);
                client.close();
            }
        });
    })
}
let sort = (col, obj, obj2) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).sort({
            ...obj2
        }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs);
                client.close();
            }
        });
    })
}
/**
 * @删除
 * 支持单条删除和多条删除
 */
let deleted = (collectionName, query) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        let col = db.collection(collectionName);
        // 条件筛选
        // 如有id, 则只要使用id查询
        if (query._id) {
            query = {
                _id: ObjectId(query._id)
            };
        }
        col[Array.isArray(query) ? 'deleteMany' : 'deleteOne'](query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}

/**
 * @修改
 * 支持单条和多条修改
 */
let update = (collectionName, query, data) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        let col = db.collection(collectionName);
        col[Array.isArray(query) ? 'updateMany' : 'updateOne'](query, {
            $set: data
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}

module.exports = {
    connect,
    insert,
    find,
    ObjectId,
    sort,
    deleted,
    update
}

// node express mongodb jquery