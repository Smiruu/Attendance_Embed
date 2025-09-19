import { supabase } from "../config/supabase.js";

export async function authenticate(req, res, next) {
  const access_token = req.headers.authorization?.split(" ")[1];
  const refresh_token = req.cookies["refreshToken"];

  if (!access_token) return res.status(401).json({ error: "Not logged in" });

  const { data, error } = await supabase.auth.getUser(access_token);

  if (error && refresh_token) {
    //refresh the access token
    const { data: newSession, error: refreshError } =
      await supabase.auth.refreshSession({
        refresh_token: refresh_token,
      });

    if (refreshError) {
      return res
        .status(401)
        .json({ error: "Session Expired, Please Log in Again" });
    }

    const newAccessToken = newSession.session.access_token;
    res.cookie("refreshToken", newSession.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 1,
    });

    res.body = { access_token: newAccessToken };
    req.user = newSession.user;
    return next();
  }

  req.user = data.user;
  
  next();
}
