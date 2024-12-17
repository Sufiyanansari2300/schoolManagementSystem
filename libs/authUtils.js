import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "7324082e959c78653f613ec643b5ca76610bd4d61d8586ba44152d8191ca1f8c62f2a1dd72c8dbcab92aef1a9dfb367628e05fa7592a20f7c472d2089d759733796ee6f626b5be98b9e9ed354526568d73fd3d9ab32fad55e1a97cc05b6aaec0551847480e837b9e2292937e99167a6e5de1565c1f16ccb079f0f440719a799f76c7b4bf030f9381be8a067669c6933fa1e01d7a52e09e3e334651f472415a25c30c422062c3f5484b89cced94df62d6c958d708b611b64d71b815eff21f112dda8dbe796a79282fd6d8f1e94e90853fd01100829224d5e8526b0161a1c6016e05428187854a77d22da759e2590762e2ab028d61939ca26a00fb770973d2a7eb";

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};


export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
