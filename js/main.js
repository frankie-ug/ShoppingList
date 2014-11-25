//creates a new shopping list object
var shopping_list = {
  new_shopping: function () {
    this.add_item = document.getElementById("add_field"); 
    this.add_button = document.getElementsByTagName("button")[0];
    this.items_to_buy = document.getElementById("items_to_buy");
    this.bought_items = document.getElementById("bought_item");
  },

  //validates user input
  check_spaces: function () {
    if(this.add_item.value.length == 0 || this.add_item.value.trim().length == 0){
      alert("Invalid Input please enter an item");
    } else {
      this.add_item_to_list();
    }
  },

  //adds item to the list and calls the appropriate events
  add_item_to_list: function () {
    var new_item = this.create_new_list_item(this.add_item.value);
    this.items_to_buy.appendChild(new_item);
    this.add_item.value = "";
    this.bind_list_events(new_item, this.item_bought);
  },

  //creates a fresh new list item
  create_new_list_item: function (item) {
    var list_item = document.createElement("li");
    var check_box = document.createElement("input");
    var delete_button = document.createElement("button");
    var label = document.createElement("label");

    check_box.type = "checkbox";
    label.innerHTML = item;
    
    delete_button.innerHTML = "Delete";

    delete_button.className = "delete";

    list_item.appendChild(check_box);
    list_item.appendChild(label);
    list_item.appendChild(delete_button);

    return list_item;
  },

  //deletes a list item
  delete_list: function () {
    var list_item = this.parentNode;
    var ul = list_item.parentNode;
    
    ul.removeChild(list_item);
  },

  item_bought: function () {
    var list_item = this.parentNode;
    document.getElementById("bought_item").appendChild(list_item);
    shopping_list.bind_list_events(list_item, shopping_list.item_not_bought);
  },

  item_not_bought: function () {
    var list_item = this.parentNode;
    document.getElementById("items_to_buy").appendChild(list_item);
    shopping_list.bind_list_events(list_item, shopping_list.item_bought);
  },

  bind_list_events: function (shop_list_item, check_box_event_handler) {
    var check_box = shop_list_item.querySelector("input[type=checkbox]");
    var delete_button = shop_list_item.querySelector("button.delete");
    
    delete_button.onclick = this.delete_list;
    check_box.onchange = check_box_event_handler;
  }

};

//adds event listeners
shopping_list.new_shopping();
document.getElementsByTagName("button")[0].addEventListener("click", function (e) { 
  e.preventDefault();
  shopping_list.check_spaces(); 
});