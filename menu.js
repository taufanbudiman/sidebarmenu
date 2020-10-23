// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
    throw new Error('Astrid requires jQuery');
}

(function($) {
    'use strict';

    var renderTopMenu = function (menu, active) {
        var li = '', classactive = '';
        
        $.each(menu, function (i, m) {
            if (active == m.caption.toLowerCase() & typeof active !== 'undefined' & active != '') {
                classactive = "class='active'";
            }
            li += '<li '+classactive+'><a href="' + m.url + '">' + m.caption + '</a></li>';
        });
        return li;
    };

    var renderleftmenu = function (menu, active) {
        var li = '', ul = '', css = '', iconDropdown = '';
        if (active == menu.caption.toLowerCase() & typeof active !== 'undefined' & active != '') {
            css += "active";
        }
        if (typeof menu.submenu !== 'undefined') {
            ul = '<ul class="treeview-menu" style="display: block;">';
            var lisub = '';
            $.each(menu.submenu, function(i, m) {
                lisub += renderleftmenu(m, active);
            });
            ul += lisub + '</ul>';
            iconDropdown = '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i>';
            css += 'treeview menu-open';
        }
        li += '<li class="' + css + '"><a href="' + menu.url + '"> <i class="' + menu.icon + '"></i> <span>' + menu.caption + '</span> ' + iconDropdown + '</a>' + ul + '</li>';
        return li;
    };


    function createNewNode(menu) {
        var newMenu = new Object();
        newMenu.caption = menu.caption;
        newMenu.url = menu.url;
        newMenu.icon = menu.icon;
        newMenu.submenu = [];
        return newMenu;
    }

    var findMenu = function(q, menu) {

        var newMenu;
        var caption = menu.caption.toLowerCase();
        q = q.toLowerCase();
        
        if (caption.search(q) > -1) {
            newMenu = menu;
        }
        else if (menu.submenu) {
            menu.submenu.forEach(function(o) {
                var dt = findMenu(q, o);
                if (dt) {
                    if (!newMenu) {
                        newMenu = createNewNode(menu);
                        
                    }
                    newMenu.submenu.push(dt);
                }
               
            });
        }
        return newMenu;
    };


    var menuJsonList = [];
    $.ajax({
        url: "/astrid/AstridMVC/Areas/lms/menu.json",
        cache: false,
        async: false,
        success: function (menus) {
            menuJsonList = menus.LMS;
        }
    });

    

    $.fn.renderTopMenu = function (options) {
        /*
        @Usage: $(element).renderTopMenu()
        */
        var opts = $.extend({}, {menuactive: ''}, options);
        this.append(renderTopMenu(menuJsonList, opts.menuactive));
        return this;
    };

    $.fn.renderLeftMenu = function (options) {
        /*
        @Usage: $(element).renderLeftMenu({options})
        */
        $('#search-menu-btn > i').attr('class', 'fa fa-refresh fa-spin');
        var defaults = {
            menuactive: '',
            indexmenu: "all",
            search: '',
        };

        var opts = $.extend({}, defaults, options);

        var menu = '';
        var menulist = [];
        if (opts.indexmenu == "all") {
            menulist = menuJsonList;
        } else if (!isNaN(opts.indexmenu)) {
            menulist.push(menuJsonList[opts.indexmenu]);
        }

        var find;
        var length = menulist.length;
        $.each(menulist, function (i, m) {
            if (opts.search != '') {

                find = findMenu(opts.search, m);
                if (typeof find !== 'undefined') {
                    menu += renderleftmenu(find, opts.menuactive, opts.search);
                    //return false;
                }

                //cek looping yang terakhir apakah menu masih tidak ada.
                if (i === (length - 1)) {
                    //if (typeof find === 'undefined') {
                    //    menu = '<li class="header"> Menu "' + opts.search + '" is not found.</li>';
                    //    return false;
                    //}
                    if (menu == '') {
                        menu = '<li class="header"> Menu "' + opts.search + '" is not found.</li>';
                    }
                }

            } else {
                menu += renderleftmenu(m, opts.menuactive);
            }
            
            //return true;
        });

        this.html(menu);
        $('#search-menu-btn > i').attr('class', 'fa fa-search');
        return this;
    };

    $.fn.findMenu = function (search) {
        var find = findMenu(search, menuJsonList[3]);
        return find;


    };
}(jQuery));