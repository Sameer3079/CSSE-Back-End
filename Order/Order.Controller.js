const Mongoose          = require("../Model/Order");
const OrderShema        = Mongoose.model("Order");

var OrderController = function(){

    /**
     * Create new order. 
     */
    this.addOrder = (Data) => {
        
        return new Promise((resolve,reject) => {
            var newOrder = new OrderShema({
                sequential : Data.sequential,
                items : Data.items,
                orderStatus : Data.orderStatus,
                orderDate : Data.orderDate,
                isDraftPurchaseOrder : Data.isDraftPurchaseOrder,
                supplierName : Data.supplierName,
                onHold : Data.onHold
            });

            newOrder.save()
            .then(() => {
                resolve({"status":"200","message":"Order is created"});
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }


    /**
     * Delete order.
     * First find a order by id, if find a matching order delete.
     * If can not find order return related message to user. 
     */
    this.deleteOrder = (id) => {
    
        return new Promise((resolve , reject) => {

            OrderShema.find({_id : id}).exec()
            .then((data) => {
                if(data.length === 1){
                    console.log("IF");
                    OrderShema.deleteOne({_id : id})
                    .then(() => {
                        resolve({"status":"200","message":"Order is deleted"});
                    })
                    .catch((err) => {
                        reject({"status":"500","message":"Err "+err})
                    });
                }
                else{
                    resolve({"status":"205","message":"Can not find order"})
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }


    /**
     * Find all orders.
     * First it check orders are existing, then return order set.
     */
    this.getAllOrders = () => {

        return new Promise((resolve, reject) => {

            OrderShema.find().exec()
            .then((data) => {
                
                if(data.length !== 0 ){
                    resolve({"status":"200","message":data});
                }
                else{
                    resolve({"status":"205","message":"Can not find order"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err"+err});
            })
        })
    }


    this.updateOrder = (id , Data) => {
        return new Promise((resolve,reject) => {

            OrderShema.find({_id : id}).exec()
            .then((data) => {
                if(data.length === 1) {

                   OrderShema.update({ _id: id }, Data)
                   .then(() => {
                        resolve({"status":"200" , "message":"Order is updated"});
                   })
                   .catch((err) => {
                        reject({"status":"500","message":"Err "+err});
                   }); 
                }   
                else{
                    resolve({"status":"205","message":"Can not find order"});
                }
            })
            .catch((err) => {
                reject({"status":"404","message":"Err "+err});
            })
        })
    }

}




module.exports = new OrderController();