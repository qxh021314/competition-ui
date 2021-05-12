
/**
 * 数据分组
 * arr <array> 源数组
 * size <number> 子数组长度
 * fill <any> 空位数据
 * 如：([1,2,3,4,5],2) -> [[1,2], [3,4], [5, null]]
 */
export default function chunkDataWithInUI(arr, size, fill = null) {
	let ret = []
	if (arr.length === 0) return []
	if (size > 1) {
		const len = arr.length
		const ri = len / size // 行数
		let index = 0
		for (let i = 0; i < ri; i++) {
			const row = []
			for (let j = 0; j < size; j++) {
				let item = arr[index++]
				row[j] = item
				if (index === len) {
					if (len % size) {
						let fi = size - (len % size)
						while (fi-- > 0) {
							row[++j] = fill // 补空位
						}
					}
					break;
				}
			}
			ret[i] = row
		}
	} else {
		ret = arr
	}
	return ret
}
