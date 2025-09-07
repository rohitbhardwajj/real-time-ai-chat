const userModel = require("./../models/user.model");
const jwt = require("jsonwebtoken");

async function signupController(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password must required" });
    }
   
    let user = await userModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
   
    const data = await userModel.create({ username, password });

    const token = jwt.sign(
      { id: data._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
 
    res.cookie("token", token, {
      httpOnly: true,   // JS se access na ho
      secure: false,    // true production me jab https ho
      sameSite: "strict"
    });

    return res.status(200).json({ 
      message: "User created successfully", 
      user: { id: data._id, username: data.username },
      token 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


async function loginController(req,res){
  try{
    const { username, password } = req.body;

    if(!username || !password){
      return res.status(400).json({ message: "Invalid username or password" });
    }

    let data = await userModel.findOne({ username }); 

    if(!data){
      return res.status(400).json({ message: "No User Found" });
    }

    if(data.password === password){   
      const token = jwt.sign(
        { id: data._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
      });

      return res.status(200).json({ message: "User login successfully", token });
    } else {
      return res.status(400).json({ message: "Incorrect password" }); 
    }

  } catch(err){
    return res.status(500).json({ message: err.message }); 
  }
}


module.exports = { signupController, loginController };
