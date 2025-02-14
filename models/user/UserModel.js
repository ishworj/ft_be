import UserModel from './UserSchema.js'

export const createUser = (userObj)=>{
    return UserModel(userObj).save();
}

export const getUserbyEmail = (email)=>{
    return UserModel.findOne({email})
}