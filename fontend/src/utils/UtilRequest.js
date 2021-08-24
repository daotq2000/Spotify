export const PaginationRequest= (page, size, field, order, search)=>{
    var request = new Object();
    request.page = page;
    request.size = size;
    request.field = field;
    request.order = order;
    request.search = search;
    return request;
}