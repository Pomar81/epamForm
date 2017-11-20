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


        function genPalleteHtml(index) {
            let str='';
            str += '<div class="row item">';
            str += '<div class="col-xs-2 ">';
            str += `<input type="checkbox" id="type_item_${index}" name="type_item_${index}" value="parcel"></div>`;
            str += `<div class="col-xs-10 itemData">`;
            str += `<div class="form-group">`;
            str += `<label for="num_item_${index}">Number of pallets:</label>`;
            str += `<div class="input-group">`;
            str += `<input type="number" class="form-control" id="num_item_${index}" name="num_item_${index}" min="1" value="1" required>`;
            str += `<span class="input-group-addon">Pcs</span></div></div>`;
            str += `<div class="form-group">`;
            str += `<label for="height_item_${index}">Height:</label>`;
            str += `<div class="input-group">`;
            str += ` <input type="number" class="form-control" id="height_item_${index}" name="height_item_${index}" required>`
            str += ` <span class="input-group-addon">Cm</span></div></div>`;
            str += `<div class="form-group">`;
            str +=  `<label for="weight_item_{index}">Weight:</label>`;
            str += ` <div class="input-group">`;
            str += ` <input type="number" class="form-control" id="weight_item_${index}" name="weight_item_${index}" step="0.01" required>`
            str +=`<span class="input-group-addon">Kg</span></div></div></div></div>`;
            return str;

        }
        function genParselHtml(index) {
            let str='';
            str += '<div class="row item">';
            str += '<div class="col-xs-2 ">';
            str += `<input type="checkbox" id="type_item_${index}" name="type_item_${index}" value="parcel"></div>`;
            str += `<div class="col-xs-10 itemData">`;
            str += `<div class="form-group">`;
            str += `<label for="num_item_${index}">Number of pallets:</label>`;
            str += `<div class="input-group">`;
            str += `<input type="number" class="form-control" id="num_item_${index}" name="num_item_${index}" min="1" value="1" required>`;
            str += `<span class="input-group-addon">Pcs</span></div></div>`;
            str += `<div class="form-group">`;
            str += `<label for="height_item_${index}">Height:</label>`;
            str += `<div class="input-group">`;
            str += ` <input type="number" class="form-control" id="height_item_${index}" name="height_item_${index}" required>`
            str += ` <span class="input-group-addon">Cm</span></div></div>`;
            str += `<div class="form-group">`;
            str +=  `<label for="weight_item_{index}">Weight:</label>`;
            str += ` <div class="input-group">`;
            str += ` <input type="number" class="form-control" id="weight_item_${index}" name="weight_item_${index}" step="0.01" required>`
            str +=`<span class="input-group-addon">Kg</span></div></div></div></div>`;
            return str;

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

        // filling datalist
        function fillDataList(id, list) {
            let str = "";
            for (let item of list) {
                str += `<option value="${item}">`;
            }
            $(`#${id}`).append(str);
        }


        //  event handler for selector parcel/pallet
        function changeItemHandler(itemNum) {
            $('#type_item_' + itemNum).change(function () {
                $(this).nextAll().remove();
                let str = "";
                if ($(this).prop("checked")) {
                    str += `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight_item_${itemNum}" step="0.01" required></label>\n`;
                    str += `<label>Length:<input type="number" id="length_item_${itemNum}" name="length_item_${itemNum}" required></label>\n`;
                    str += `<label>Height:<input type="number" id="height_item_${itemNum}" name="height_item_${itemNum}" required></label>\n`;
                    str += `<label>Width:<input type="number" id="width_item_${itemNum}" name="width_item_${itemNum}" required></label>\n`;
                } else {
                    str += `<label>Number of pallets:<input type="number" id="num_item_${itemNum}" name="num_item_${itemNum}" min="1" value="1" required></label>\n`;
                    str += `<label>Height:<input type="number" id="height_item_${itemNum}" name="height_item_${itemNum}" required></label>\n`;
                    str += `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight_item_${itemNum}" step="0.01" required></label>\n`;
                }
                $(this).parent().append(str);
            });
        }


// event handler for add button
        $('.addBtn').click(function () {
            const $lastItem = $('.item').last();
            if ($lastItem.length) {
                const itemNum = +($lastItem.find('[type="checkbox"]').attr('id').slice(10)) + 1;
                let str = genPalleteHtml(itemNum);
                $lastItem.after(genPalleteHtml(itemNum));
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
                .map(function (ind, elm) {
                    const obj = {};
                    $(this).find('input')
                        .each(function () {
                            let name = $(this).attr("name");
                            name = name.slice(0, name.indexOf("_item"));
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

        // adding event handler for the first item
        changeItemHandler(0);

        // filling country list
        fillDataList('countries', ["Australia", "Belarus", "France", "Ukraine"]);
    }
);


