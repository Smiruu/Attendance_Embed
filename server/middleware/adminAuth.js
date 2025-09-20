import { supabase } from "../config/supabase.js";

export const adminAuth = async (req, res, next) => {
  try {
    // Check if user is attached (from auth middleware)
    if (!req.user) {
      const err = new Error("Not authenticated");
      err.status = 401;
      return next(err);
    }

    // Fetch role from profiles table using user id
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", req.user.id)
      .maybeSingle();

    if (error) {
      error.status = 500;
      return next(error);
    }

    if (!profile) {
      const err = new Error("Profile not found");
      err.status = 404;
      return next(err);
    }

    console.log("User role from DB:", profile.role);

    // Check if role is admin
    if (profile.role !== "admin") {
      const err = new Error("Access denied: Admins only");
      err.status = 403;
      return next(err);
    }

    // Continue if admin
    next();
  } catch (error) {
    next(error);
  }
};
