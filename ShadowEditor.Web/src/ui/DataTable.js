import Control from './Control';

/**
 * 数据表格
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function DataTable(options = {}) {
    Control.call(this, options);

    this.cols = options.cols || [];
    this.rows = options.rows || [];

    this.cls = options.cls || 'Table';
    this.style = options.style || null;
}

DataTable.prototype = Object.create(Control.prototype);
DataTable.prototype.constructor = DataTable;

DataTable.prototype.render = function () {
    this.dom = document.createElement('div');
    this.parent.appendChild(this.dom);

    if (this.cls) {
        this.dom.className = this.cls;
    }

    if (this.style) {
        Object.assign(this.dom.style, this.style);
    }

    // 计算列的总宽度
    var width = 0;

    this.cols.forEach(n => {
        width += n.width || 100;
    });

    // 表格头
    this.head = document.createElement('table');
    this.head.className = 'head';
    this.dom.appendChild(this.head);

    var tr = document.createElement('tr');

    var th = document.createElement('th'); // 序号列
    th.innerHTML = '#';
    Object.assign(th.style, {
        width: '60px',
        textAlign: 'center'
    });
    tr.appendChild(th);

    this.cols.forEach(n => { // 数据列
        var th = document.createElement('th');
        th.innerHTML = n.title || '&nbsp;';
        Object.assign(th.style, {
            width: `${this.dom.clientWidth / width * (n.width || 100)}px`
        });
        tr.appendChild(th);
    });

    this.head.appendChild(tr);

    // 表格体
    this.body = document.createElement('table');
    this.body.className = 'body';
    this.dom.appendChild(this.body);

    this.rows.forEach((n, i) => {
        var tr = document.createElement('tr');

        var td = document.createElement('td'); // 序号列
        td.innerHTML = `${i + 1}`;
        Object.assign(td.style, {
            width: '60px',
            textAlign: 'center'
        });
        tr.appendChild(td);

        this.cols.forEach(m => { // 数据列
            var td = document.createElement('td');

            if (n[m.field]) {
                td.innerHTML = n[m.field];
            }

            Object.assign(td.style, {
                width: `${this.dom.clientWidth / width * (n.width || 100)}px`
            });

            tr.appendChild(td);
        });

        this.body.appendChild(tr);
    });
};

export default DataTable;