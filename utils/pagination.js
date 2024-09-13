// utils/paginate.js
const paginate = async (query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const results = await query.skip(skip).limit(limit);
    const count = await query.countDocuments();
  
    return {
      results,
      page,
      totalPages: Math.ceil(count / limit),
      totalResults: count
    };
};

module.exports = paginate;
