import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();
 
// api endpoint
app.use("/api/food", foodRouter); 
app.use("/images", express.static('uploads'));   
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter)

app.get("/", (req, res) => {
    res.send("Api Working!");
})

app.listen(port, () => console.log(`Server running on port ${port}`));

//  await mongoose.connect('mongodb+srv://rishikasingh0711:rishikasingh0711@cluster0.edkyl.mongodb.net/Food Delivery').then(()=>{console.log("Database connected!")});

