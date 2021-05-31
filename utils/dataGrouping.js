// 将相同元素进行分组
function sortClass(sortData, key){
	
  const groupBy = (array, key , f) => {
    let groups = {};
    array.forEach((o) => {
      let group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
	
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  };
  
  const sorted = groupBy(sortData, key , (item) => {
    return item[key]; // 返回需要分组的对象
  });
  return sorted;
};

// sortClass(data, key)

export {
	sortClass
}
