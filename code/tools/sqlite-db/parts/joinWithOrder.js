import joinTmpl from '../utils/joinTagTmpl'

export const orderProps = {
	first: { type: 'order', value: true },
	last: { type: 'order', value: true },
	priority: { type: 'order', value: (num) => num }
};
export const toOrderArray = (arr) => {
	let len = arr?.length;
	if(!len) return [];
	else if(len === 1) return [arr[0]];
	
	let res = [], f, l, p, o; // first, last, priority, other
	for(let item of arr) {
		switch(item?.order?.key) {
			case 'first': f = item; break;
			case 'last': l = item; break;
			case 'priority': 
				(p || (p=[])).push(item); 
				break;
			default: (o || (o=[])).push(item);
		}
	}
	if(f) res.push(f);
	if(p) res.push(...p.sort((a, b) => b.order.value - a.order.value));
	if(o) res.push(...o);
	if(l) res.push(l);
	return res;
};
export const itemsArrayToString = (arr) => {
	let str = '';
	arr = toOrderArray(arr);
	for(let item of arr) {
		str += joinTmpl(item.value) + '\n';
	}
	return str.trim();
};