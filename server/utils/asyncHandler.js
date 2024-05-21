const asyncHandler = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => next(err));
  };
};

export default asyncHandler

/*
    -> async handler is a HIGHER ORDER function .
    -> It recieves an async function as a parameter .
    -> In return it gives another function that has a req, res, and next
    -> This returned function is responsible to execute the asyncFn recieved.
    -> We handle any error while executing this asyncFn using .catch(err=>next(err)).
    -> Simply passing on error to next , so that it reacher global error handling middleware.

    WHY ASYNC HANDLER ?

    -> Now if we wrap any async function with this async handler , there is no need to write try catch
    -> It is a perfect use case for our controllers.
    -> We wrap our controllers which are async , with the async handler .

    -> exports.getAllProducts = asyncHandler(async(req,res)=>{ // more about async handler in ../utils/asyncHandler.js
        const products = await Product.find().populate('reviews');
        res.status(200).json({
            success:true,
            data:{
                products
            }
        })
    })

    -> Now the variable getAllProducts, will recieve a function as a return from async handler .
    -> That returned function will execute the asyncFunction and handle the error.
    -> Hence , express can execute this returned funtion without worrying about error handling

*/