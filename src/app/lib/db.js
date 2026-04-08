const { DB_USERNAME, DB_PASSWORD, MONGO_CLUSTER, MONGO_DB } = process.env;
const pw = "Kk@123#789";
export const connectionStr = `mongodb+srv://nsk:${encodeURIComponent(pw)}@cluster0.efo5pz1.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority`;
