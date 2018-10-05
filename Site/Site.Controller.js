const Mongoose          = require("../Model/Site");
const SiteSchema        = Mongoose.model("Site");

const SiteConroller = function(){

    /**
     * 
     * Create new site service.
     */
    this.addSite = (Data) => {
        return new Promise((resolve,reject) => {

            /**
             * Check site name already existing.
             */
            SiteSchema.find({siteName : Data.siteName}).exec()
            .then((data) => {
                if(data.length === 0){
    
                    var site = new SiteSchema({
                        siteName : Data.siteName,
                        address : Data.address,
                        items : Data.items,
                        storageCapacity : Data.storageCapacity,
                        currentCapacity : Data.currentCapacity,
                        managerName : Data.managerName,
                        siteManager: Data.siteManager
                    });
    
                    site.save()
                    .then(() => {
                        resolve({"status":"201","message":"Site Created"});
                    })
                    .catch((err) => {
                        reject({"status":"404","message":"Error "+err});
                    });
                }
                else{
                    resolve({"status":"200","message":"Site "+Data.siteName+" is aready exsist"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        });
    }

    
    /**
     * Get all site list
     */
    this.getAllSites = () => {
        return new Promise((resolve,reject) => {
            SiteSchema.find().exec()
            .then((data) => {
                if(data.length !== 0){
                    resolve({"status":"200","message":data});
                }
                else{
                    reject({"status":"204","message":"No Content"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }


    /**
     * Get a particuler site's item list, find by item list using site name.
     */
    this.getItemOfSite = (name) => {
        return new Promise((resolve,reject) => {

            SiteSchema.find({siteName : name}).exec()
            .then((data) => {

                if(data.length === 1){
                    resolve({"status":"200","message":data[0].items});
                }
                else{
                    resolve({"status":"205","message":"Can not find site"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }
}

module.exports = new SiteConroller();