var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    items: [{type: Schema.Types.ObjectId, ref:'Item'}]
}, {timestamps: true});

var User = mongoose.model("User", UserSchema);