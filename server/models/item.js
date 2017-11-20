var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be at least 5 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minlength: [10, "Description must be at least 10 characters."]
    },
    checked: {
        type: Boolean,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    users: [{type: Schema.Types.ObjectId, ref:'User'}]
}, {timestamps: true});

var Item = mongoose.model("Item", ItemSchema);