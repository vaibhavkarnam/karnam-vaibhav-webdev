var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: { type: mongoose.Schema.Types.ObjectId, ref: 'GraduatePageModel' },
    type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'] },
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: { type: String, default: '100%' },
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    order: Number,
    dateCreated: { type: Date, default: Date.now() }
}, { collection: 'widget'});

module.exports = widgetSchema;