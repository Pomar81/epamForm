$(function () {
        "use strict";
        let itemId = 0;

        // function for parsing address ----------------------
        function splitAddressStr(str) {
            "use strict";
            const obj = {
                zip: null,
                address: null
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

        // generating object for form data --------------------
        const formData = {
            from: {
                country: null,
                zipCode: null,
                address: null,
            },
            to: {
                country: null,
                zipCode: null,
                address: null,
            },
            items: [],
        };

        // function fot print formData to console --------------
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

        // function for filling dataList datalist --------------------
        function fillDataList(id, list) {
            let str = "";
            for (let item of list) {
                str += `<option value="${item}">`;
            }
            $(`#${id}`).append(str);
        }

        // initialization -------------------------
        //1. fill cointries dataList
        fillDataList('countries', ["Australia", "Belarus", "France", "Ukraine"]);
        //2. init first checkbox
        initCheckboxHandlers(0);
        //3.

        // event handler for add button -------------------
        $('.addBtn').click(function () {
            itemId++;
            const $lastItem = $('form .item').last();
            // const itemNum = +($lastItem.find('[type="checkbox"]').attr('id').slice(10)) + 1;
            const $newRow = $('.template1').clone().addClass('itemWrapper').removeClass('template1').removeAttr('style');
            const htmlStr = ($newRow.html()).replace(/{%1}/ig, itemId);
            $('.btnRow').before($newRow.html(htmlStr));
            initCheckboxHandlers(itemId);
        });


        //  event handler for selector parcel/pallet -----------------------
        function initCheckboxHandlers(id) {
            $('#type_item_' + id).bootstrapToggle()
                .change(function () {
                    $(this).parents('.item').find('.itemData').remove();


                    if ($(this).prop("checked")) {
                        const elms =$('.template1 .itemData').clone().each(function(){
                            $(this).html($(this).html().replace(/{%1}/ig, itemId));
                        });
                        $(this).parents('.item').append(elms);
                    } else {
                        const elms =$('.template2 .itemData').clone().each(function(){
                            $(this).html($(this).html().replace(/{%2}/ig, itemId));
                        });
                        $(this).parents('.item').append(elms);
                    }
                });

        }


        // event handler for remove button -----------------------
        $('.remBtn').click(function () {
            if (itemId) {
                itemId--;
            }
            const $item = $('.itemWrapper');
            if ($item.length) {
                $item.last().remove();
            }
        });

// event handler for submit button
        $('#form').submit(function (event) {
            event.preventDefault();
            // parsing addresses
            formData.from.country = $('#from_country').val() || null;
            let addr = splitAddressStr($('#from_addr').val());
            formData.from.zipCode = addr.zip;
            formData.from.address = addr.address;
            formData.to.country = $('#to_country').val() || null;
            addr = splitAddressStr($('#to_addr').val());
            formData.to.zipCode = addr.zip;
            formData.to.address = addr.address;
            // parsing items
            formData.items = $('form .item')
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
    }
);


