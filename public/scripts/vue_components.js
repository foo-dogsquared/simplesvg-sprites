"use strict";
function Vue_Data(data) {
    return {
        icons: data,
        selected: Array.from([]),
        active: false
    }
}

function Vue_Methods() {
    return {
        
    }
}

function Vue_Components() {
    return {
        "selected-list": {
            props: {
                list: Array
            },
            data: function() {
                return {
                    selected_list: Array.from([]),
                    selected_rm_list: Array.from([]),
                    status_text: ""
                }
            },
            methods: {
                configure_selected_list : function() {
                    for (const icon of this.list) {
                        if (_.indexOf(this.selected_list, icon) === -1) this.selected_list.push(icon)
                        else continue;
                    }
                    this.status_text = `${this.selected_list.length} ${(this.selected_list.length === 1) ? "item" : "items"} has been added. [${this.list}]`
                    return 0;
                },
                rm_all : function() {
                    this.selected_list = Array.from([]);
                    return 0;
                },
                rm_selected_items : function() {
                    this.selected_list = _.pullAll(this.selected_list, this.selected_rm_list);
                    this.status_text = `${this.selected_rm_list.length} ${(this.selected_rm_list.length === 1) ? "item" : "items"} has been removed. [${this.selected_rm_list}]`;
                    console.log(this.selected_rm_list)
                    this.selected_rm_list = Array.from([]);
                    return 0;
                }
                
        },
            template: `<section>
                            <button v-on:click="configure_selected_list">Add to list</button>
                            <button v-on:click="rm_all">Remove all</button>
                            <button v-on:click="rm_selected_items">Remove selected items</button>
                            <div class="status-text">{{status_text}}</div>
                            <div class="selected-icon-grid">
                                <div class="selected-icon" v-for="icon in selected_list"><span>{{icon}}</span><input type="checkbox" v-model="selected_rm_list" v-bind:value="icon"></div>
                            </div>
                        </section>`
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
