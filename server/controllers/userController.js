import userModel from "../config/models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

// Initialize Stripe if secret is present
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key');
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.mesage });
  }
};

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User don't exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { name: user.name } });
      } else {
        return res.json({ success: false, message: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  const userCredits = async (req,res) => {
    try {
      const {userId} = req.body
      const user = await userModel.findById(userId)
      res.json({success:true,credits:user.creditBalance,user:{
        name:user.name
      }})
    } catch (error) {
      console.log(error.message)
      res.json({success:false, message: error.message})
    }
  }

  const paymentStripe = async (req, res) => {
    try {
      const { userId, planId } = req.body;
      const { origin } = req.headers; // to construct success/cancel urls

      const userData = await userModel.findById(userId);
      if (!userData || !planId) {
        return res.json({ success: false, message: "Missing Details" });
      }

      let credits, amount, planDesc;
      if (planId === "Basic") {
        credits = 100;
        amount = 10;
        planDesc = "Basic Plan";
      } else if (planId === "Advanced") {
        credits = 500;
        amount = 50;
        planDesc = "Advanced Plan";
      } else if (planId === "Business") {
        credits = 5000;
        amount = 250;
        planDesc = "Business Plan";
      } else {
        return res.json({ success: false, message: "Invalid Plan" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: process.env.CURRENCY || "usd",
              product_data: {
                name: planDesc,
                description: `Purchase ${credits} credits`,
              },
              unit_amount: amount * 100, // Stripe amount is in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/verify?success=true&session_id={CHECKOUT_SESSION_ID}&planId=${planId}`,
        cancel_url: `${origin}/buy`,
        metadata: {
          userId,
          planId,
          credits,
        },
      });

      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  const verifyStripe = async (req, res) => {
    try {
      const { sessionId, userId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const credits = Number(session.metadata.credits);
        const userData = await userModel.findById(userId);
        
        await userModel.findByIdAndUpdate(userId, {
          creditBalance: userData.creditBalance + credits,
        });

        res.json({ success: true, message: "Credits Added" });
      } else {
        res.json({ success: false, message: "Payment Failed" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  export {registerUser,loginUser,userCredits,paymentStripe,verifyStripe}