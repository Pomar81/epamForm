$(function () {
    "use strict";

    function splitAddressStr(str) {
        "use strict";
        const obj = {
            zip: "",
            address: ""
        };
        const arr = str.split(',').filter(elm => elm !== "");
        if (arr.length > 0) {
            obj.zip = arr[0].trim();
            arr.shift();
        }

        if (arr.length > 0) {
            obj.address = arr.join(" ").trim();
        }
        return obj;
    }

    // object for form data
    const formData = {
        from: {
            country: "",
            zipCode: "",
            address: "",
        },
        to: {
            country: "",
            zipCode: "",
            address: "",
        },
        items: [],
    };
    formData.toString = function () {
        let str;
        str = `from: ${this.from.country} ${this.from.zipCode} ${this.from.address}\n`;
        str += `to: ${this.to.country} ${this.to.zipCode} ${this.to.address}\n`;
        str += `items:\n`;

        let i = 1;
        for (let item of this.items) {
            str += `${i++}:`;
            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    str += ` ${key}: ${item[key]}`;
                }
            }
            str += `\n`;
        }
        return str;
    };

    //  event handler for selector parcel/pallet
    function changeItemHandler(itemNum) {
        $('#type_item_' + itemNum).change(function() {
            $(this).nextAll().remove();
            let str = "";
            if ($(this).prop("checked")) {
                str += `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight" step="0.01" required></label>\n`;
                str += `<label>Length:<input type="number" id="length_item_${itemNum}" name="length" required></label>\n`;
                str += `<label>Height:<input type="number" id="height_item_${itemNum}" name="height" required></label>\n`;
                str += `<label>Width:<input type="number" id="width_item_${itemNum}" name="width" required></label>\n`;
            } else {
                str += `<label>Number of pallets:<input type="number" id="num_item_${itemNum}" name="num" min="1" value="1" required></label>\n`;
                str += `<label>Height:<input type="number" id="height_item_${itemNum}" name="height" required></label>\n`;
                str += `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight" step="0.01" required></label>\n`;
            }
            $(this).parent().append(str);
        });
    }


    // added event handler for the first item
    changeItemHandler(0);

// event handler for add button
    $('.addBtn').click(function () {
        const $lastItem = $('.item').last();
        if ($lastItem.length) {
            const itemNum = +($lastItem.children('[type="checkbox"]').attr('id').slice(10)) + 1;
            let str = "";
            str += `<div class="item">\n`;
            str += `<input type="checkbox" id="type_item_${itemNum}" name="type" value="parcel">\n`;
            str += `<label>Number of pallets:<input type="number" id="num_item_${itemNum}" name="num" min="1" value="1" required></label>\n`;
            str += `<label>Height:<input type="number" id="height_item_${itemNum}" name="height" required></label>\n`;
            str += `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight" step="0.01" required></label>\n`;
            str += `</div>`;

            $lastItem.after(str);
            changeItemHandler(itemNum);
        }
    });

// event handler for remove button
    $('.remBtn').click(function () {
        const $item = $('.item');
        if ($item.length > 1) {
            $item.last().remove();
        }
    });

// event handler for submit button

    $('#form').submit(function (event) {
        event.preventDefault();
        // parsing addresses
        formData.from.country = $('#from_country').val();
        let addr = splitAddressStr($('#from_addr').val());
        formData.from.zipCode = addr.zip;
        formData.from.address = addr.address;
        formData.to.country = $('#to_country').val();
        addr = splitAddressStr($('#to_addr').val());
        formData.to.zipCode = addr.zip;
        formData.to.address = addr.address;
        // parsing items
        formData.items = $('.item')
            .map(function(ind, elm) {
                const obj = {};
                $(this).find('input')
                    .each(function() {
                        const name = $(this).attr("name");
                        if (name === 'type') {
                            obj[name] = $(this).prop("checked") ? 'parcell' : 'pallet';
                        } else {
                            obj[name] = $(this).val();
                        }
                    });
                return obj;
            }).get();

        console.log(formData.toString());

    })
});


