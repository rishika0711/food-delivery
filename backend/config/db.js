import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rishikasingh0711:rishikasingh0711@cluster0.edkyl.mongodb.net/FoodDelivery').then(()=>{console.log("Database connected!")});
}

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://rishikasingh0711:rishikasingh0711@cluster0.edkyl.mongodb.net/FoodDelivery', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Database connected successfully!");
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         process.exit(1); // Exit process with failure
//     }
// };
