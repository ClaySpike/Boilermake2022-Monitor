module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        temperature: Number, 
        altitude: Number,
        time: Date,
        sn: String,
        sound: Number,
        pressure: Number,
        humidity: Number
    }, {});

    const observation = mongoose.model('observation', schema);
    return observation;
}