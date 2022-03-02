class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",                     // i-case insensitive
            },
        }:{};

       
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}; // copying from original
        
        //Removing some feild for category which are not needed. 
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
       
       
        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy);     // converted to string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
        
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        // for skipping if user is in page 2 and supp.10 prodts per page then we have to show 11th prodt in 2 page & skip 10 prodt
        const skip = resultPerPage * (currentPage-1); //  ex.for 1st page = 10*(1-1)=0 so 0 skip.

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};
module.exports = ApiFeatures;