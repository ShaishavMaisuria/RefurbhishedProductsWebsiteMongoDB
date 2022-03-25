const model =require('../models/item');

// GET /trades: send all stories main page of trades //name change
exports.index=(req,res)=>{
    let trades=model.find();
    // console.log(trades);
    res.render('./trade/index',{trades});

};

// Each category trade.html, basically show all the trades inside the list
exports.showEachTrade=(req,res,next)=>{
    let id = req.params.id;
    let category= req.params.category;
    let trade = model.findById(category,id);
    if(trade){
    res.render('./trade/trade',{trade});
    // console.log("trades................"+trade)
    } else{
       
        let err = ""
        if(trade===undefined){
         err = new Error('Cannot find a trade with id '+id);
        }else{
             err = new Error('Cannot find a trade with category '+category); 
        }
        err.status=404;
        next(err);
    }
};


// POST /trades: create a new story
exports.create=(req,res)=>{

    let trade = req.body;
    let category='Laptop';
    model.save(trade);
    res.redirect('/trades');
    // console.log("trades................"+trade)
};
// this method is used to edit the object retrived from id and category
exports.edit=(req,res,next)=>{

    let category=req.params.category;
    let id = req.params.id;
    let trade=model.findById(category,id);
   if(trade){
    res.render('./trade/edit',{trade});
} else{
   
    let err = ""
    if(trade===undefined){
     err = new Error('Cannot find a trade with id '+id);
    }else{
         err = new Error('Cannot find a trade with category '+category); 
    }
    err.status=404;
    next(err);
}

};

//PUT: update the trade using id and changed id obtained from the trade
exports.update=(req,res,next)=>{

    let updatedTrade = req.body;
    let id = req.params.id;
    let category=req.params.category;
    // updatedTrade.category=category;
    let trade=model.updateByCategoryID(updatedTrade,category,id)
   if(trade ){
    res.redirect('/trades/'+updatedTrade.category+"/"+id);
} else{
    let err = ""
    if(trade===undefined){
     err = new Error('Cannot find a trade with id '+id);
    }else{
         err = new Error('Cannot find a trade with category '+category); 
    }
    err.status=404;
    next(err);
}
};
// Delete /trades: delete the trade using id and category
exports.delete=(req,res,next)=>{

    let id = req.params.id;
    let category=req.params.category;
    let trade= model.deleteByCategoryID(category,id)
   if(trade){
    res.redirect('/trades');
   } else{
    let err = ""
    if(trade===undefined){
     err = new Error('Cannot find a trade with id '+id);
    }else{
         err = new Error('Cannot find a trade with category '+category); 
    }
     err.status=404;
       next(err);
   }
    
};

