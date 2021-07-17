const admin = require("firebase-admin");

//* Return profile if jwt valid
export const profile = async function(req, res) {
  try {
    const token = req.signedCookies.authorization.split("Bearer ");
    let decoded = await admin.auth().verifyIdToken(token[1]);
    return res.json({ profile: decoded, ok: true });
  } catch (e) {
    return res.json({ ok: false, message: "No authorization" });
  }
};

//* Signed token into cookie
export const signToken = async function(req, res) {
  try {
    let { token } = req.body;
    res.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      signed: true,
      sameSite: true
    });
    return res.json({ ok: true, message: "Signed token success." });
  } catch (e) {}
};

//* Clear cookie
export const logout = async function(req, res) {
  try {
    res.clearCookie("authorization");
    return res.json({ ok: true, message: "Signed success." });
  } catch (e) {}
};
