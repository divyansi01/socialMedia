import user from "../models/user";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await user.find();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await user.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exits!" });
    }
    const newUser = new user({
        name,
        email,
        password
    });

    try {
        await newUser.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ newUser });
}

