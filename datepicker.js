module.exports = function(app){
    require('jquery-datetimepicker');
    require('jquery-datetimepicker/jquery.datetimepicker.css');
    var Datepicker = Object.getPrototypeOf(app).Datepicker = new app.Component("datepicker");
    //Datepicker.debug = true;
    Datepicker.createdAt      = "2.0.0";
    Datepicker.lastUpdate     = "2.6.0";
    Datepicker.version        = "1.0.4";
    // Datepicker.factoryExclude = true;
    // Datepicker.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Datepicker.requires       = [];

    Datepicker.dateFormat     = {
        'fr' : 'd/m/Y',
        'en' : 'm/d/Y',
    }
    var lang = $('html').attr('lang') || 'fr';
    $.datetimepicker.setLocale(lang);

    Datepicker.prototype.onCreate = function(){
        var datepicker = this;
        datepicker.datepicker = (datepicker.datepicker !== undefined) ? datepicker.datepicker : datepicker.getData('datepicker', true);
        datepicker.timepicker = (datepicker.timepicker !== undefined) ? datepicker.timepicker : datepicker.getData('timepicker', true);
        datepicker.inline     = (datepicker.inline !== undefined)     ? datepicker.inline     : datepicker.getData('inline', false);
        datepicker.minDate    = (datepicker.minDate !== undefined)    ? datepicker.minDate    : datepicker.getData('mindate', false);
        datepicker.maxDate    = (datepicker.maxDate !== undefined)    ? datepicker.maxDate    : datepicker.getData('maxdate', false);
        datepicker.startDate  = (datepicker.startDate !== undefined)  ? datepicker.startDate  : datepicker.getData('startdate', false);
        datepicker.mask       = (datepicker.mask !== undefined)       ? datepicker.mask       : datepicker.getData('mask', false);
        datepicker.reset      = (datepicker.reset !== undefined)      ? datepicker.reset      : datepicker.getData('reset', false);
        datepicker.readonly   = (datepicker.readonly !== undefined)   ? datepicker.readonly   : datepicker.getData('readonly', true);

        datepicker.formatDate = (datepicker.formatDate !== undefined) ? datepicker.formatDate : datepicker.getData('formatdate', Datepicker.dateFormat[lang]);
        if (datepicker.timepicker) {
            datepicker.formatTime = (datepicker.formatTime !== undefined) ? datepicker.formatTime : datepicker.getData('formattime', 'H:i');
            datepicker.format = datepicker.formatDate+' '+datepicker.formatTime;
        } else {
            datepicker.format = datepicker.formatDate;
        }

        datepicker.$el.attr('readonly',datepicker.readonly);
        if (datepicker.reset) {
            var $wrapper = $('<div class="input-group form-shrink"></div>').insertAfter(datepicker.$el);
            var $reset = $('<button class="btn-sm squared"><i class="fa fa-times"></i></button>');
            $wrapper.append(datepicker.$el);
            $wrapper.append($reset);

            $reset.on('click',function(){
                datepicker.$el.val('').trigger('change');
            });
        }

        var objConfig = {
            timepicker: datepicker.timepicker,
            datepicker: datepicker.datepicker ,
            inline:     datepicker.inline ,
            format:     datepicker.format,
            formatDate: datepicker.formatDate,
            formatTime: datepicker.formatTime,
            minDate:    datepicker.minDate,
            maxDate:    datepicker.maxDate,
            startDate:  datepicker.startDate,
            mask:       datepicker.mask,
            // lazyInit:   true,
            weeks: true
        };

        if(!datepicker.datepicker && datepicker.timepicker){
            objConfig.format = datepicker.formatTime;
            delete objConfig.formatDate;
        }

        datepicker.$el.datetimepicker(objConfig).datetimepicker('validate');
        if(datepicker.startDate)
            datepicker.$el.val(datepicker.startDate);

        datepicker.$el.on('change keyup blur', function(){
            datepicker.updateTstamp();
            if (this.getAttribute('required') !== null) {
                datepicker.$el.removeClass('invalid valid');
                if (this.value.length == 0)
                    datepicker.$el.addClass('invalid');
                else
                    datepicker.$el.addClass('valid');
            }
        });
        datepicker.$el.datetimepicker('validate');

        if(Datepicker.debug) datepicker.log('Datepicker has been created');
    }

    Datepicker.prototype.updateTstamp = function(){
        var datepicker = this;
        if(datepicker.$el.datetimepicker('getValue') != null && datepicker.$el.val() != '')
            datepicker.$el.attr('data-tstamp', Date.parse(datepicker.$el.datetimepicker('getValue'))/1000);
        else
            datepicker.$el.attr('data-tstamp', '');
    }
    Datepicker.prototype.onDestroy = function(){
        var datepicker = this;
        if(Datepicker.debug) datepicker.log('Datepicker has been destroyed');
    }

    Datepicker.prototype.onResize = function(){
        var datepicker = this;
        if(Datepicker.debug) datepicker.log('Datepicker has been resized');
    }


    return Datepicker;
}