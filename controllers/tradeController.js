const model =require('../models/item');

// GET /trades: send all stories main page of trades //name change
exports.index=(req,res)=>{
    let trades=model.find();

    let categoryNames=[];
    // console.log(trades);
    model.distinct("category",function(err,results){
        
        categoryNames=results;
        categoryNames.sort();
    });

    
    model.find()
    .then(

        trades=>{
console.log(trades);
        res.render('./trade/index',{trades,categoryNames});
        }
    )
    .catch(err=>next(err));
   
};

// Each category trade.html, basically show all the trades inside the list
exports.showEachTrade=(req,res,next)=>{
    let id = req.params.id;
      // an objectId is a 24-bit hex string
      if (!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid Story ID");
        err.status=400;
        return next(err);

    }
    model.findById(id)
    .then(trade=>{

        if(trade){
          
            console.log("**************************testing value reached");
            res.render('./trade/trade',{trade});
            // console.log("trades................"+trade)
            } else{
              let err = new Error('Cannot find a trade with id '+id);
            err.status = 404;
            next(err);
        }

    })
    .catch(err=>next(err));

};


// POST /trades: create a new story
exports.create=(req,res,next)=>{

    let trade = new model(req.body);
    console.log("trades*/*/***/**/*/*/*"+trade.category);
    trade.save()
    .then(trade=> res.redirect('/trades'))
    .catch(err=>{

        if (err.name==="ValidationError"){
            err.status=400;
        }
        next(err);
    });
};
// this method is used to edit the object retrived from id and category
exports.edit=(req,res,next)=>{
    let id = req.params.id;
    // an objectId is a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error("Invalid Story ID");
      err.status=400;
      return next(err);
  }
  model.findById(id)
  .then(trade=>{

      if(trade){
        res.render('./trade/edit',{trade});
          // console.log("trades................"+trade)
          } else{
            let err = new Error('Cannot find a trade with id '+id);
          err.status = 404;
          next(err);
      }

  })
  .catch(err=>next(err));

};

//PUT: update the trade using id and changed id obtained from the trade
exports.update=(req,res,next)=>{
    let trade = req.body;
    let id = req.params.id;
    // an objectId is a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error("Invalid Story ID");
      err.status=400;
      return next(err);

  }
  model.findByIdAndUpdate(id,trade,{useFindAndModify:false,runValidators:true})
  .then(trade=>{

      if(trade){
        res.redirect('/trades/'+id);
          // console.log("trades................"+trade)
          } else{
            let err = new Error('Cannot find a trade with id '+id);
          err.status = 404;
          next(err);
      }

  })
  .catch(err=>{

    if (err.name==="ValidationError"){
        err.status=400;
    }
    next(err);
});
};
// Delete /trades: delete the trade using id and category
exports.delete=(req,res,next)=>{


    let id = req.params.id;
    // an objectId is a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error("Invalid Story ID");
      err.status=400;
      return next(err);

  }
  model.findByIdAndDelete(id,{useFindAndModify:false})
  .then(trade=>{

      if(trade){
        res.redirect('/trades');
          // console.log("trades................"+trade)
          } else{
            let err = new Error('Cannot find a trade with id '+id);
          err.status = 404;
          next(err);
      }

  })
  .catch(err=>next(err));
    
};

