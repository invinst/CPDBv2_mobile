function getPaginationResponse(apiUrl, generator, limit, offset, count) {
  var hasNext = count > offset + limit;
  var previous = null;
  if (offset) {
    if (offset > limit) {
      previous = apiUrl + 'limit=' + limit + '&offset=' + (offset - limit);
    } else {
      previous = apiUrl;
    }
  }
  return {
    count: count,
    next: hasNext ? apiUrl + 'limit=' + limit + '&offset=' + (offset + limit) : null,
    previous: previous,
    results: generator(hasNext ? limit : Math.max(count - offset, 0))
  };
}

module.exports = {
  getPaginationResponse: getPaginationResponse
};
