import userModel from "../models/userModel.js";

// add item to user cart 
// const addToCart = async (req,res) =>{
//     try{
//         let userData = await userModel.findById(req.body.userId);
//         console.log('userDar', userData)
//         // let cartData = await userData.cartData;
//         let cartData = userData.cartData || {}; 
//         if(!cartData[req.body.itemId])
//         {

//             cartData[req.body.itemId] = 1
//             console.log('eede')
//             console.log('cart', cartData)
//         } else {
//             cartData[req.body.itemId] += 1;
//             console.log('updatecart', cartData)
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//           res.json({success: true, message: "Added To Cart"});
        
//     } catch(error) {
//         console.log(error);
//         res.json({success:false, message:"Error"})
//     }
// }

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        // Ensure cartData is an object
        let cartData = userData.cartData || {}; // Default to empty object if null/undefined

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.json({ success: false, message: "Error" });
    }
};
//remove items from user cart
const removeFromCart =async(req, res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:"Remove From Cart"})
    } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//fetch user cart data 
const getCart = async(req, res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addToCart, removeFromCart, getCart}


