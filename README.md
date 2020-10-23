# Sidebar Menu

Required :
1. AdminLTE v2.4.5
2. JQuery >= 3.3.1

js ini digunakan untuk menampilkan menu dengan menggunakan file JSON atau ajax di template AdminLTE v2.4.5. fungsi ini juga dapat menampilkan top menu (navbar) pada template.
load script `menu.js` dengan tag seperti dibawah ini. letakan file JSON pada satu folder dengan menu.js
```javascsript
<script src="/path/to/menu.js"></script>
```
script ini akan menampilkan menu di dalam tag `ul` pada sidebar menu. misalnya :
```html
<ul class="sidebar-menu tree" data-widget="tree">
    ...
    menu akan ditampilkan disini
    ...
</ul>
```

sedangkan pada top menu (navbar) akan menampilkan dalam `<ul>` misalnya :
```html
<ul class="nav navbar-nav">
    ...
    menu akan ditamplikan disini
    ...
</ul>
```

## Sidebar Menu
```javascript
$(element).renderLeftMenu()
```
tag diatas menampilkan menu pada sidebar, `options` yang tersedia adalah `menuactive`, `indexmenu` dan `q`. `menuactive` digunakan untuk mengeset menu mana yang akan dijadikan aktif, `indexmenu` digunakan untuk menampilkan menu pada menu pada index JSON yang digunakan, `q` digunakan untuk mencari nama menu, contoh sebagai berikut :

```javascript
$(element).renderLeftMenu({
  'menuactive': 'company'
})
```
tag tersebut akan menambahkan class active pada li.

```javascript
$(element).renderLeftMenu({
  'indexmenu': 0
})
```
tag tersebut akan manempilkan menu pada index ke 0 pada JSON, inputan yang tersedia pada `indexmenu` adalah `"all", 0, 1, 2, dst`. secara default `indexmenu` terisi `all`

```javascript
$(element).renderLeftMenu({
  'q': 'divisi'
})
```
tag tersebut digunakan untuk mencari nama menu berdasaran caption pada JSON.

semua `option` yang tersedia
```javascript
$(element).renderLeftMenu({
  'menuactive': ''
  'indexmenu': 'all',
  'q': ''
})
```

## Top Menu (navbar menu)
```javascript
$(element).renderTopMenu()
```
tag diatas menampilkan menu pada sidebar, `options` yang tersedia adalah `menuactive` yang digunakan untuk menambahkan class active pada `<li>`


# Screenshot

