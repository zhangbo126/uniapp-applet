function dateObj (props) {
	this.startYear = props.startYear || new Date().getFullYear() - 5;
	this.endYear = props.endYear || new Date().getFullYear() + 5;
	this.defaultValue = props.defaultValue?new Date(props.defaultValue):new Date();
	this.dateMode = props.dateMode || 3;
	this.dateFormatArray = props.dateFormatArray || ['-', '-', ' ', ':', ':'];
}
function customObj (props) {
	this.itemArray = props.itemArray || [];
	this.linkage = props.linkage || false;
	this.linkageNum = props.linkageNum || 2;
	this.defaultValue = props.defaultValue || null;
	this.steps = props.steps || {};
}
function custom2Obj (props) {
	this.itemArray = props.itemArray || [];
	this.itemObject = props.itemObject || {};
	this.linkage = props.linkage || false;
	this.linkageNum = props.linkageNum || 2;
	this.defaultValue = props.defaultValue || null;
	this.steps = props.steps || {};
}
function cityObj (props) {
	this.defaultValue = props.defaultValue || [0, 0, 0];
}
const _app = {
	showToast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	showLoading(msg, ifmask) {
		uni.showLoading({
			title: msg,
			mask: ifmask || false
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	//date
	countDays(Y, val) {
		let days = new Date(Y,(val[1]+1),0).getDate();
		if (val) {
			val[2] = val[2] < days - 1? val[2] : days - 1;
		}
		return {
			days,
			val
		};
	},
	countYears(sy, ey) {
		let _this = this;
		let y = [];
		let c = ey - sy;
		for (let i = 0; i <= c; i++) {
			y.push(sy + i);
		}
		return y;
	},
	creatDateObj(props) {
		return new dateObj(props || {});
	},
	creatCustomObj(props) {
		return new customObj(props || {});
	},
	creatCustom2Obj(props) {
		return new custom2Obj(props || {});
	}
}
export default _app;
