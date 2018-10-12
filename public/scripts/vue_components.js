"use strict";
function Vue_Data() {
    return {
        selected: Array.from([]),
        active: false,
        selected_list: Array.from([]),
        selected_rm_list: Array.from([]),
        status_text: "",
        status_text_warning: false,
        confirm_active: false,
    }
}

function Vue_Methods() {
    return {
        isListEmpty: function() {
            return this.selected_list.length === 0;
        },

        toggle_status_text_warning : function(bool, message) {
            if (bool) this.status_text_warning = true;
            else this.status_text_warning = false;
            this.status_text = message;
        },

        configure_selected_list : function(e) {
            const target = e.target;
            if (target.tagName === "OPTION" || target.tagName === "BUTTON");
            else return 1;

            if (this.selected.length === 0) {
                this.toggle_status_text_warning(true, "There's no selected item.");
                return 1;
            }

            let count = 0;
            const added_items = emptyArray();

            for (const icon of this.selected) {
                if (_.indexOf(this.selected_list, icon) === -1) {
                    this.selected_list.push(icon);
                    added_items.push(icon);
                    count++;
                }
                else continue;
            }

            if (this.selected.length === 1 && count === 0) this.toggle_status_text_warning(false, `Selected item has already been added`);
            else if (count === 0) this.toggle_status_text_warning(true, `All selected items has already been added.`);
            else this.toggle_status_text_warning(false, `${count} ${(count === 1) ? "item" : "items"} has been added. [${(added_items.length > 5) ? added_items[0] + "..." + added_items[added_items.length - 1] : added_items}]`);

            this.selected = emptyArray();
            return 0;
        },

        rm_all : function() {
            if (this.isListEmpty()) {
                this.toggle_status_text_warning(true, `There are no items to be removed.`);
                return 1;
            }
            this.selected_list = emptyArray();
            this.selected_rm_list = emptyArray();
            this.toggle_status_text_warning(false, `All items have been removed.`);
            return 0;
        },
        rm_selected_items : function() {
            if  (this.isListEmpty()) {
                this.toggle_status_text_warning(true, "There's no added items in the list yet.")
                return 1;
            }
            else if (this.selected_rm_list.length === 0) {
                this.toggle_status_text_warning(true, "No items have been selected yet.");
                return 1;
            }

            this.selected_list = _.pullAll(this.selected_list, this.selected_rm_list);
            if (this.selected_list.length === 0) this.toggle_status_text_warning(true, `All items have been removed. (You could've used the 'Remove All' button, though. 👀)`)
            else this.toggle_status_text_warning(false,`${this.selected_rm_list.length} ${(this.selected_rm_list.length === 1) ? "item" : "items"} has been removed. [${(this.selected_rm_list.length > 5) ? this.selected_rm_list[0] + "..." + this.selected_rm_list[this.selected_rm_list.length - 1] : this.selected_rm_list}]`);
            this.selected_rm_list = emptyArray()
            return 0;
        },
        sort_items : function() {
            if (this.isListEmpty()) {
                this.toggle_status_text_warning(true, `No items to be sorted.`);
                return 1;
            }
            
            this.selected_list.sort(pseudoAlphabeticalSort);

            this.toggle_status_text_warning(false, "Selected items sorted.")
        },

        compile_SVG : function() {
            if (this.isListEmpty()) {
                this.toggle_status_text_warning(true, "Please select an icon to compile to SVG.");
                return 1;
            }
            const body_text = encodeURIComponent(this.selected_list.toString());
            const post_data = new Post_Compile_Data(body_text);
            this.toggle_status_text_warning(false, "Creating SVG on the server...");
            
            const headers = post_data.headers;
            const body = post_data.body;
            const method = post_data.method;
            fetch('/compile', {method, body, headers})
                .then(response => response.blob())
                .catch(response => response.json())
                .then(blob => {
                    createDownloadBox(blob, "simplesvg-sprites.svg");
                    this.selected_list = emptyArray();
                    this.selected_rm_list = emptyArray();
                    this.status_text = "SVG successfully (probably) created."
            })
                .catch(error => {
                    console.log(error);
                    this.toggle_status_text_warning(true, "There is something wrong with the server.")
            })
        },
    }
}

function callVue(element, vue_data, vue_methods = {}, vue_components = {}) {
    return new Vue({
        el: element,
        components: vue_components,
        data: vue_data,
        methods: vue_methods
    })
}
