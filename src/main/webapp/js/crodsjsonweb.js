var xmlhttp = new XMLHttpRequest();

var tablestyle = "table table-striped table-bordered";
function print(elemid) {
	// data=data._source;
	console.log(elemid);
	var data = document.getElementById(elemid);
	console.log(data.value);
	
	var ele = document.getElementById("content");
	data = JSON.parse(data.value);
	console.log(data);
	_print(data, ele);
}
function _print(data,ele) {
	// data=data._source;
	ele.innerHTML = "";
	var table = document.createElement("table");
	table.className = tablestyle;
	// table = toTable(data, table, null);
	table = toTableNew(data, null, null);
	ele.appendChild(table);
}

function toTableNew(data, parent, selfkey) {
	if (typeof data === 'object') { // Array or Map
		if (Object.prototype.toString.call(data) === '[object Array]') { // Array

			var table = createTable();

			if (data != null && data.length > 0) {

				if (Object.prototype.toString.call(data[0]) === '[object Array]') { // Array
					handleArrayObjects(table, data, parent, selfkey);
				} else if (typeof data[0] === 'object') { // map

					var cr = createHeaderRow(table);
					if (data.length > 1) {
						var cd1 = createHeaderCell(cr);
	
						var a = document.createElement("span");
						a.innerHTML = '(+) ' + selfkey + ' ';
	
						cd1.appendChild(a);
						var span = document.createElement("span");
						span.className = "badge";
						span.innerHTML = '(' + data.length + ')';
						cd1.appendChild(span);
	
						cd1.setAttribute("style", "vertical-align: top;");
					}
					var cd2 = createDataCell(cr);
					var div = document.createElement("div");
					var ctable2 = createTable();
					var tblid = tableid;
					
					if (data.length > 1) {
					ctable2.className = ctable2.className + " collapse";
					ctable2.setAttribute("data-target", "#" + tableid);

					a.setAttribute('onclick', "toggle(this," + "'" + tableid
							+ "','" + data.length + "')");
					}
					div.appendChild(ctable2);
					
					div.setAttribute("id", "div_" + tblid);
					cd2.appendChild(div);

					cd2.setAttribute("id", "ctd_" + tblid);
					ctdMap["div_" + tblid] = div;
					
					handleArrayMaps(ctable2, data, parent, selfkey);

				} else { // data
					handleArrayData(table, data, parent, selfkey);
				}

			}

			return table;
		} else { // Map

			var table = createTable();

			handleMapObject(table, data, parent, selfkey);

			return table;
		}
	} else { // data

		return data;

	}
}
function handleArrayData(table, data, parent, selfkey) {
	for ( var row in data) {
		var tr = createDataRow(table);
		var td = createDataCell(tr);
		td.innerHTML = data[row];
	}
}
var orderedHeadersMap = new Object();
function handleMapObject(table, data, parent, selfkey) {

	var tr = null;
	var form = null;
	for ( var key in data) {
		if (key.endsWith("_Ordered")) {
			orderedHeadersMap[key] = data[key];
		}
	}
	
		for ( var key in data) {
			if (key.endsWith("_Ordered")) {
				continue;
			}
			tr = createDataRow(table);
			var td = createHeaderCell(tr);
			td.innerHTML = key;

			var td = createDataCell(tr);
			var value = toTableNew(data[key], data, key);
			if (typeof value == 'object') {
				td.appendChild(value);
			} else {
				td.innerHTML = value;
			}
		}
	
}
function handleArrayMaps(table, data, parent, selfkey) {
	var orderedHeader = null;

	if (orderedHeadersMap[selfkey + "_Ordered"] != null) {
		orderedHeader = orderedHeadersMap[selfkey + "_Ordered"];
	}

	if (orderedHeader != null) {
		var tr = createHeaderRow(table);
		for ( var key in orderedHeader) {
			if ("END_DATE"==orderedHeader[key]) {
				continue;
			}
			var td = createHeaderCell(tr);
			td.innerHTML = orderedHeader[key];
		}
		var dataRow = null;

		for ( var row in data) {
			var isCurrent = false;
			var isLogicallyDeleted = false;
			var tr = createDataRow(table);
			for ( var key in orderedHeader) {
				if ("END_DATE"==orderedHeader[key]) {
					continue;
				}
				var td = createDataCell(tr);
				var value = toTableNew(data[row][orderedHeader[key]],
						data[row], orderedHeader[key]);
				if (typeof value == 'object') {
					td.appendChild(value);
				} else {
					td.innerHTML = value;
				}
			}
			if (data[row] != null && data[row]['END_DATE'] != '9999-12-31') {
				isLogicallyDeleted = true;
			}
			if (data[row] != null && data[row]['VERSION'] == '99999999') {
				isCurrent = true;
			}

			dataRow = tr;

			if (isCurrent && isLogicallyDeleted) {// logically deleted
				dataRow.setAttribute("style", "color:red; font-size: 16px");
			} else if (isCurrent && !isLogicallyDeleted) {// current
				dataRow.setAttribute("style", "color:green; font-size: 18px");
			} else if (!isCurrent && isLogicallyDeleted) {// old version
				dataRow.setAttribute("style", "color:gray; font-size: 16px");
			}

		}
	} else {
		var tr = createHeaderRow(table);
		for ( var key in data[0]) {
			var td = createHeaderCell(tr);
			td.innerHTML = key;
		}

		for ( var row in data) {
			var tr = createDataRow(table);

			for ( var key in data[row]) {
				var td = createDataCell(tr);
				var value = toTableNew(data[row][key], data[row], key);
				if (typeof value == 'object') {
					td.appendChild(value);
				} else {
					td.innerHTML = value;
				}
			}

			if (data[row] != null && data[row]['END_DATE'] != '9999-12-31') {
				isLogicallyDeleted = true;
			}
			if (data[row] != null && data[row]['VERSION'] == '99999999') {
				isCurrent = true;
			}

			dataRow = tr;

			if (isCurrent && isLogicallyDeleted) {// logically deleted
				dataRow.setAttribute("style", "color:red; font-size: 16px");
			} else if (isCurrent && !isLogicallyDeleted) {// current
				dataRow.setAttribute("style", "color:green; font-size: 18px");
			} else if (!isCurrent && isLogicallyDeleted) {// old version
				dataRow.setAttribute("style", "color:gray; font-size: 16px");
			}
		}
	}
}
function handleArrayObjects(table, data, parent, selfkey) {
	for ( var row in data) {
		var tr = createDataRow(table);
		for ( var key in data[row]) {
			var td = createDataCell(tr);
			var value = toTableNew(data[row][key], data[row], key);
			if (typeof value == 'object') {
				td.appendChild(value);
			} else {
				td.innerHTML = value;
			}
		}
	}
}
function createTable() {

	tableid++;

	var table = document.createElement("table");
	table.className = tablestyle;
	table.setAttribute("id", tableid);

	var thead = document.createElement("thead");
	table.appendChild(thead);

	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	return table;
}
function createDataRow(table) {
	var tr = document.createElement("tr");

	var tbody = table.getElementsByTagName("tbody")[0];
	tbody.appendChild(tr);

	return tr;
}
function createHeaderRow(table) {
	var tr = document.createElement("tr");

	var thead = table.getElementsByTagName("thead")[0];
	thead.appendChild(tr);

	return tr;
}
function createHeaderCell(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	return td;
}
function createDataCell(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	return td;
}

var tableid = 0;
var ctdMap = new Object();
function toggle(span, eleName, datalen) {
	var ele = document.getElementById(eleName);
	var ctd = document.getElementById("ctd_" + eleName);
	var div = document.getElementById("div_" + eleName);

	if (span.innerHTML.indexOf('+') != -1) {
		span.innerHTML = span.innerHTML.replace('+', '-');

		var divCache = ctdMap["div_" + eleName]

		ctd.appendChild(divCache);

		ele = document.getElementById(eleName);
		$(ele.getAttribute('data-target')).collapse('toggle');
		// $('#'+eleName).dynatable();
		if (datalen > 2) {
			$('#' + eleName).DataTable();
		}

	} else {
		span.innerHTML = span.innerHTML.replace('-', '+');
		$(ele.getAttribute('data-target')).collapse('toggle');

		ctd.removeChild(div);
	}
}
