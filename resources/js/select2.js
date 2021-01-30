export const formatOptionWithIcon = (option) => {
    if (option.element) {
        let icon_name = option.element.attributes.icon_name.nodeValue
        let containerClass = option.element.attributes.container_class ? option.element.attributes.container_class.nodeValue : null
        return $(`<div class="select-option ${containerClass !== null ? containerClass : ""}"><i class="${icon_name}"></i>${option.text}</div>`)
    }
}
export const formatOptionWithImage = (option) => {
    if (option.element) {
        let img_src = option.element.attributes.img_address.nodeValue
        return $(`<div class="select-option"><img src="${img_src}" class="member-img" />${option.text}</div>`)
    }
}

export const formatOption = (option) => {
    if (option.element) {
        return $(`<div class="select-option">${option.text}</div>`)
    }
}

$('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select, #mixed_tasks_order_select, #mixed_tasks_order_by_select, #mixed_tasks_relation_select, #mixed_demands_order_select, #mixed_demands_order_by_select, #mixed_demands_relation_select, #mixed_needs_order_select, #mixed_needs_order_by_select, #mixed_needs_relation_select').select2({
    templateResult: formatOptionWithIcon,
    minimumResultsForSearch: Infinity,
    width: '100%',
    dir: "rtl",
})

$("#new-task-members").select2({
    templateResult: formatOptionWithImage,
    placeholder: "انجام دهندگان این کار",
    width: "100%",
    dir: 'rtl',
    multiple: true,
})
$('.select2-search__field').css('width', '100%')

$('#task-select').select2({
    templateResult: formatOption,
    placeholder: 'کار مربوطه را انتخاب کنید',
    width: "100%",
    dir: "rtl"
})

$('#new-demand-member').select2({
    templateResult: formatOptionWithImage,
    placeholder: "نیاز به کمک چه کسی دارید؟",
    width: "100%",
    dir: "rtl"
})