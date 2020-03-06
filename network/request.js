const baseUrl = 'http://ygt.linyakq.com/api/'
export default function request(url, callback, data, method='POST'){
	uni.request({
	    url: baseUrl + url, 
		method,
	    data: data,
	    success: callback
	})
}
