var app = new Vue({
    el: "#app",
    data: {
        newItem: "",
        items: [],
    },
    methods: {
        addItem: function () {
            if (this.newItem.trim() !== "") {
                this.items.push({
                    text: this.newItem,
                    editing: false,
                });
                this.newItem = "";
            }
        },
        editItem: function (index) {
            this.items[index].editing = true;
        },
        saveItem: function (index) {
            this.items[index].editing = false;
        },
        deleteItem: function (index) {
            this.items.splice(index, 1);
        },
    },
});