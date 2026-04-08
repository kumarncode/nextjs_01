import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: String, //{ type: String, required: true },
    price: String, //{ type: Number, required: true },
    company: String, //{ type: String, required: true },
    color: String, //{ type: String, required: true },
    category: String, //{ type: String, required: true }
});
export const Product = mongoose.models.products || mongoose.model("products", productSchema);