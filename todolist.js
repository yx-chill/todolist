const txt = document.querySelector('.txt');
const btnAdd = document.querySelector('.add');
const list = document.querySelector('.list');
const tot = document.querySelector('.tot');
const btnFilter = document.querySelector('.btn-filter');
const btnAll = document.querySelector('.all');
const btnTodo = document.querySelector('.todo');
const btnComplete = document.querySelector('.complete');
const clear = document.querySelector('.clear');
const todoList = document.querySelector('.output');

let datas = localStorage.getItem('datas');
if (datas) {
	datas = JSON.parse(datas);//Json to array
	if (datas.length) {
		todoList.setAttribute("style", "display:block");
		renderList();
	}
} else {
	datas = [];
}

btnAdd.addEventListener("click", function (e) {
	if (txt.value == '') {
		return;
	}

	addList();
	renderList();
	txt.value = '';
})

txt.addEventListener('keyup', function (e) {
	if (e.keyCode === 13) {
		if (txt.value == '') {
			return;
		}

		addList();
		renderList();
		txt.value = '';
	}

	if (e.keyCode === 27) {
		txt.value = '';
	}
})

btnFilter.addEventListener("click", function (e) {
	btnStatus(e.target);
	dataFilter(e.target);
})

list.addEventListener('click', function (e) {
	switch (e.target.nodeName) {
		case 'IMG':
			let num = e.target.getAttribute("data-num");
			console.log(num);
			datas.splice(num, 1);
			break;
		case 'INPUT':
			let i = e.target.getAttribute('id');
			datas[i].status = e.target.checked;
			break;
		default:
			return;
	}
	renderList();
})

clear.addEventListener("click", function (e) {
	cleanItem();
	renderList();
})

//渲染畫面
function renderList() {
	localStorage.setItem('datas', JSON.stringify(datas));//array to Json
	todoCount();
	const btnFocus = document.querySelector('.focus');
	btnStatus(btnFocus);
	dataFilter(btnFocus);
}

//計算待辦數
function todoCount() {
	let count = 0;
	datas.forEach(function (item, index) {
		if (!item.status)
			count++;
	})
	tot.textContent = `${count}個待完成項目`;
}

//新增事項
function addList() {
	let obj = { status: false };
	todoList.setAttribute("style", "display:block");
	let content = txt.value.trim();
	obj.content = content;
	datas.push(obj);
}

//取得選取的按鈕
function btnStatus(btnFocus) {
	btnAll.classList.remove('focus');
	btnTodo.classList.remove('focus');
	btnComplete.classList.remove('focus');
	//新增CLASS
	btnFocus.classList.add('focus')
}

//資料篩選
function dataFilter(btnFocus) {
	let str = '';
	if (btnFocus.value == '全部') {
		datas.forEach(function (item, index) {
			let checked = item.status ? 'checked' : '';
			str += `<li><input type="checkbox" id="${index}" ${checked}><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
		})
	}

	if (btnFocus.value == '待完成') {
		datas.forEach(function (item, index) {
			if (!item.status) {
				str += `<li><input type="checkbox" id="${index}"><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
			}
		})
	}

	if (btnFocus.value == '已完成') {
		datas.forEach(function (item, index) {
			if (item.status) {
				str += `<li><input type="checkbox" id="${index}" checked><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
			}
		})
	}
	list.innerHTML = str;
}

//清除已完成項目
function cleanItem() {
	for (let i = datas.length - 1; i >= 0; i--) {
		if (datas[i].status) {
			datas.splice(i, 1);
		}
	}
}