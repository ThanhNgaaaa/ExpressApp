var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    name: String
});
schema.virtual('employees',{
    ref:'users',
    localField:'_id',
    foreignField:'departmentId'
})
schema.set('toJSON',{virtuals:true});
schema.set('toObject',{virtuals:true});
module.exports = mongoose.model("departments", schema);