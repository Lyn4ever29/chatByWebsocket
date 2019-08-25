string2buffer: function(str) {
	// 首先将字符串转为16进制
	let val = ""
	for (let i = 0; i < str.length; i++) {
		if (val === '') {
			val = str.charCodeAt(i).toString(16)
		} else {
			val += ',' + str.charCodeAt(i).toString(16)
		}
	}
	// 将16进制转化为ArrayBuffer
	return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
		return parseInt(h, 16)
	})).buffer
}


// export default bar