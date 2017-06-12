var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: { type: mongoose.Schema.Types.ObjectId, ref: 'GraduatePageModel' },
    type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true },
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    order: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now() }
}, { collection: 'widget'});

module.exports = widgetSchema;