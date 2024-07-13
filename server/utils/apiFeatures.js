class APIFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
    // we will first build the this.query and then execute it using await in productsController.


    //1.filter
    filter() {
      const queryParams = { ...this.queryStr };
      // { original_price: { gte: '1200' } } , ideal query should look like { original_price: { $gte: '1200' } }
      //1.ADVANCED FILTERING
  
      const excludedParams = ["sort", "limit", "page", "feilds"];
      excludedParams.forEach((param) => delete queryParams[param]);


      if (queryParams.search) {
        const searchRegex = new RegExp(queryParams.search, "i");
        this.query = this.query.find({ title: { $regex: searchRegex } });
        delete queryParams.search;
      }

      //first delete unecessary feilds and then make the string
      let queryParamsStr = JSON.stringify(queryParams);
      queryParamsStr = queryParamsStr.replace(
        /\b{gt|gte|lt|lte}\b/g,
        (match) => `$${match}`
      );
  
      //we first build the query and then later await it , so that we chain multiple methods to it at once.
      this.query = this.query.find(JSON.parse(queryParamsStr));
      return this; //when we chain multiple methods , we chain them on the returned value, hence the functions
      //should return this .
  
      // ex- new APIFeature().filter().sort() , now sort will be chained on the result of new APIFeature().filter()
      //and hence new APIFeature().filter() need to return this . i.e the current object.
    }
  
    //2.sorting
    sort() {
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      }
      return this;
    }
  
    //3.limit feilds
    limit() {
      if (this.queryStr.feilds) {
        const feilds = this.queryStr.feilds.split(",").join(" ");
        this.query = this.query.select(feilds);
      }
      return this;
    }
  
    //4. Pagination
     paginate() {
      const page = this.queryStr.page * 1 || 1; // *1 is a trick to convert string to integer
      const limit = this.queryStr.limit * 1 || 10;
      const skip = (page - 1) * limit; //i.e if limit = 10 and page = 4 we skip 1 to 30 ie 4-1*10
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  export default APIFeatures;