import {supabase }from "../../config/supabase.js";

class AuthenticationController{
  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      const accessToken = data.session.access_token;
      const refreshToken = data.session.refresh_token;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 1,
      });

      console.log("User logged in")
      res.status(200).json({ user:data.session.user , accessToken });
    } catch (error) {
      console.error("Error during login:", error.message);
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Error during logout:", error.message);
      next(error);
    }
  }

  static async refreshSession(req, res, next){
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided" });
        }   
        const {data, error} = await supabase.auth.refreshSession({refresh_token: refreshToken});
      
      if (error) throw error;
      res.cookie("refreshToken", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 1,
      });

      res.status(200).json({message: "Token Refreshed", accessToken: data.session.access_token});
    } catch (error) {
      next(error)
    }
  }
}

export default AuthenticationController;