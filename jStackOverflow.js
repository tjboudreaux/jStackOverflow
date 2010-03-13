(function($){
    $.jStackOverflow ={ 
    
        defaults: {
            protocol:       "http://",
            domain:         "stackoverflow.com",
            format:         "json",          
            gravatarId:     ".gravatar",
            displayNameId:  ".displayName",
            reputationId:   ".reputation",
            badgesId:       ".badges",
            profileUrlId:   ".profileurl",
            parentId:       "#so-flair", 
            makeCallbacks:  true,
            flairCallback:  function(data, options)
                            { 
                               $(options.parentId+" "+options.gravatarId).append(data.gravatarHtml);
                               $(options.parentId+" "+options.reputationId).append(data.reputation);
                               $(options.parentId+" "+options.badgesId).append(data.badgeHtml);
                               $(options.parentId+" "+options.displayNameId).append(data.displayName);
                               $(options.parentId+" "+options.profileUrlId).attr("href", data.profileUrl).append("Visit my profile");
                            }
        },

        options: { },
    
        apis: { },
        
     
        
        setOptions: function(opt) {
            delete this.options;
            this.options = $.extend(this.defaults, opt);
            this.setApis();
        
            return this;
        },
    
        setApis : function ()
        {
            this.apis.flair = this.options.protocol + this.options.domain + "/users/flair/" + this.options.id + "." + this.options.format;
            
            if (this.options.makeCallbacks)
            {
                this.apis.flair += "?callback=?";
            }
            
            return this;
        
        }, 
    
    
        flair: function(options){
            
            this.setOptions(options);
            var self = this;
            
            if ( this.options.makeCallbacks)
            {
                var result = $.getJSON(this.apis.flair, function(data){ self.flairCallback(data,self.options)});
            } else {
                var result = $.getJSON(this.apis.flair, function(data){ self.flairCallback(data,self.options)});
            }

            return result;
        },
        
        flairCallback:  function(data, options)
                        { 
                          
                           console.log(options);
                           $(options.parentId+" "+options.gravatarId).append(data.gravatarHtml);
                           $(options.parentId+" "+options.reputationId).append(data.reputation);
                           $(options.parentId+" "+options.badgesId).append(data.badgeHtml);
                           $(options.parentId+" "+options.displayNameId).append(data.displayName);
                           $(options.parentId+" "+options.profileUrlId).attr("href", data.profileUrl).append("Visit my profile");
                        }
   
        
    }
})(jQuery);