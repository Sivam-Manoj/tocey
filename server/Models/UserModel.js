const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')){
       return next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
    next()

})

UserSchema.methods.checkPassword = async function(givenPassword){
    return await bcryptjs.compare(givenPassword,this.password)
}
const User = mongoose.model("User", UserSchema);

module.exports = User;
