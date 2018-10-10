"use strict";
function Vue_Data(data) {
    return {
        icons: data,
        selected: Array.from([]),
        active: false,
        selected_list: Array.from([]),
        selected_rm_list: Array.from([]),
        status_text: "",
        status_text_warning: false
    }
}

function Vue_Methods() {
    return {
        isListEmpty: function() {
            return this.selected_list.length === 0;
        },

        configure_selected_list : function(e) {
            const target = e.target;

            if (target.tagName !== "OPTION" || target.tagName !== "BUTTON")

            if (this.selected.length === 0) {
                this.status_text = "There's no selected item.";
                return 1;
            }

            let count = 0;
            const added_items = Array.from([]);

            for (const icon of this.selected) {
                if (_.indexOf(this.selected_list, icon) === -1) {
                    this.selected_list.push(icon);
                    added_items.push(icon);
                    count++;
                }
                else continue;
            }

            if (this.selected.length === 1 && count === 0) {
                this.status_text_warning = false;
                this.status_text = `Selected item has already been added`;
            }
            else if (count === 0) {
                this.status_text_warning = true;
                this.status_text = `All selected items has already been added.`;
            }
            else {
                this.status_text_warning = false;
                this.status_text = `${count} ${(count === 1) ? "item" : "items"} has been added. [${(added_items.length > 10) ? added_items[0] + "..." + added_items[added_items.length - 1] : added_items}]`;
            }
            return 0;
        },

        rm_all : function() {
            if (this.isListEmpty()) {
                this.status_text_warning = true;
                this.status_text = `There are no items to be removed.`;
                return 1;
            }
            this.selected_list = Array.from([]);
            this.status_text_warning = false;
            this.status_text = `All items have been removed.`
            return 0;
        },
        rm_selected_items : function() {
            if  (this.isListEmpty()) {
                this.status_text_warning = true;
                this.status_text = "There's no added items in the list yet.";
                return 1;
            }
            else if (this.selected_rm_list.length === 0) {
                this.status_text_warning = true;
                this.status_text = "No items have been selected yet."
                return 1;
            }

            this.selected_list = _.pullAll(this.selected_list, this.selected_rm_list);
            if (this.selected_list.length === 0) this.status_text = `All items have been removed. (You could've used the 'Remove All' button, though. ;-))`
            else this.status_text = `${this.selected_rm_list.length} ${(this.selected_rm_list.length === 1) ? "item" : "items"} has been removed. [${(this.selected_rm_list.length > 5) ? this.selected_rm_list[0] + "..." + this.selected_rm_list[this.selected_rm_list.length - 1] : this.selected_rm_list}]`;
            console.log(this.selected_rm_list)
            this.selected_rm_list = Array.from([]);
            return 0;
        },
        sort_items : function() {
            if (this.isListEmpty()) {
                this.status_text_warning = true;
                this.status_text = `No items to be sorted.`;
                return 1;
            }
            
            this.selected_list.sort((x, y) => {
                if (x.toLowerCase() > y.toLowerCase()) return 1
                else if (x.toLowerCase() < y.toLowerCase()) return -1
                else return 0
            })
            
            this.status_text_warning = false;
            this.status_text = "Selected items sorted."
        },

        compile_SVG : function() {
            this.status_text = `It is in development phase.`
        }
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
