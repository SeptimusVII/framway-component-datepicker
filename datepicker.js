module.exports = function(app){
    var Datepicker = Object.getPrototypeOf(app).Datepicker = new app.Component("datepicker");
    //Datepicker.debug = true;
    Datepicker.createdAt      = "2.0.0";
    Datepicker.lastUpdate     = "2.0.0";
    Datepicker.version        = "1";
    // Datepicker.factoryExclude = true;
    // Datepicker.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Datepicker.requires       = [];

    // Datepicker.prototype.onCreate = function(){
    // do thing after element's creation
    // }
    return Datepicker;
}