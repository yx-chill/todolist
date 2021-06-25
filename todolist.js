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

let datas = []
btnAdd.addEventListener("click", function (e) {
    let obj = {};
    if (txt.value == '') {
        return;
    } else {
        todoList.setAttribute("style", "display:block");
        let content = txt.value.trim();
        obj.content = content;
        obj.status = false;
        datas.push(obj);
        txt.value = '';
        renderList();
    }
})
//渲染畫面
function renderList() {
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
//取得選取的按鈕
function btnStatus(btnFocus) {
    if (btnFocus.value == '全部') {
        btnTodo.classList.remove('focus');
        btnComplete.classList.remove('focus');
    } else if (btnFocus.value == '待完成') {
        btnAll.classList.remove('focus');
        btnComplete.classList.remove('focus');
    } else {
        btnAll.classList.remove('focus');
        btnTodo.classList.remove('focus');
    }
}
//資料篩選
function dataFilter(btnFocus) {
    let str = '';
    if (btnFocus.value == '全部') {
        datas.forEach(function (item, index) {
            if (item.status) {
                str += `<li><input type="checkbox" id="${index}" checked><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
            } else {
                str += `<li><input type="checkbox" id="${index}"><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
            }
        })
    }
    if (btnFocus.value == '待完成') {
        datas.forEach(function (item, index) {
            if (!item.status) {
                str += `<li><input type="checkbox" id="${index}"><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
            }
        })
    } else if (btnFocus.value == '已完成') {
        datas.forEach(function (item, index) {
            if (item.status) {
                str += `<li><input type="checkbox" id="${index}" checked><label for="${index}"><span></span>${item.content}</label><img src="https://hexschool.github.io/js-todo/assets/cancel.jpg" class="del" data-num="${index}"></li>`;
            }
        })
    }
    list.innerHTML = str;
}

btnFilter.addEventListener("click", function (e) {
    e.target.classList.add('focus');
    btnStatus(e.target);
    const btnFocus = document.querySelector('.focus')
    dataFilter(btnFocus);
})

list.addEventListener("click", function (e) {
    if (e.target.nodeName == 'IMG') {
        let num = e.target.getAttribute("data-num");
        datas.splice(num, 1);
    } else if (e.target.nodeName != 'INPUT') {
        return;
    } else {
        let i = e.target.getAttribute('id');
        if (e.target.checked) {
            datas[i].status = true;
        } else {
            datas[i].status = false;
        }
    }
    console.log(datas);
    renderList();
})
clear.addEventListener("click", function (e) {
    cleanItem();
    renderList();
})


function cleanItem() {
    datas.forEach(function (item, index) {
        if (item.status) {
            datas.splice(index, 1);
        }
    })
}