const mongoose = require ( 'mongoose' );
const bcrypt = require ( 'bcrypt-nodejs' );

const Schema = mongoose.Schema;
const clients = mongoose.model( 'clients' );

const users = new Schema(     // BD_Usuarios
  {
    user: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true, unique: true },
    access: Number,
    admin: Number,
    date: Date,
    active: Boolean,
    clients: [
      { type: Schema.ObjectId, ref: 'clients' },
    ],
  });

users.pre('save', ( next ) => {
  const user = this;
  console.log(this);

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
users.methods.comparePassword =  (password) => {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};
// var masterusuarios = mongoose.model('masterusuarios', masterUsuariosSchema);
// module.exports = {
//   masterusuarios: masterusuarios,
// };
module.exports = users;