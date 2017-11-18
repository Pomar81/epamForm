"use-strict";

//  event handler for selector parcel/pallet
// if value is changed, there will be different input elements
$('[id^="type_item_"]').on('change', function () {
    const itemNum = $(this).attr('id').slice(10);
    $(this).siblings().remove();
    if($(this).prop("checked")) {
        $(this).parent()
            .append(
                `<label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight_item_${itemNum}" required></label>
                <label>Length:<input type="number" id="length_item_${itemNum}" name="length_item_${itemNum}" required></label>
                <label>Height:<input type="number" id="height_item_${itemNum}" name="height_item_${itemNum}" required></label>
                <label>Width:<input type="number" id="width_item_${itemNum}" name="width_item_${itemNum}" required></label>`);
    } else {
        $(this).parent()
            .append(
                `<label>Number of pallets:<input type="number" id="num_item_${itemNum}" name="num_item_${itemNum}" min="1" value="1"
                                                required></label>
                <label>Height:<input type="number" id="height_item_${itemNum}" name="height_item_${itemNum}" required></label>
                <label>Weight:<input type="number" id="weight_item_${itemNum}" name="weight_item_${itemNum}" required></label>`);
    }
})


// event handler

