
import mongoose from "mongoose"



const Connection =  async (username,password) =>{
    const URL = `mongodb://${username}:${password}@cluster0-shard-00-00.gasd2.mongodb.net:27017,cluster0-shard-00-01.gasd2.mongodb.net:27017,cluster0-shard-00-02.gasd2.mongodb.net:27017/?ssl=true&replicaSet=atlas-r1q30f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL , {useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting database', error);
    }

}

export default Connection;