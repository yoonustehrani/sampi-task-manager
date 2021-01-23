export const formatOption = (option) => {
    if (option.element) {
        let icon_name = option.element.attributes.icon_name.nodeValue
        let containerClass = option.element.attributes.container_class ? option.element.attributes.container_class.nodeValue : null
        return $(`<div class="select-option ${containerClass !== null ? containerClass : ""}"><i class="${icon_name}"></i>${option.text}</div>`)
    }
}
export const formatMemberOption = (option) => {
    if (option.element) {
        let img_src = option.element.attributes.img_address.nodeValue
        return $(`<div class="select-option"><img src="${img_src}" class="member-img" />${option.text}</div>`)
    }
}
$('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select').select2({
    templateResult: formatOption,
    minimumResultsForSearch: Infinity,
    width: '100%',
    dir: "rtl",
})
$("#new-task-members").select2({
    placeholder: "انجام دهندگان این کار",
    width: "100%",
    dir: 'rtl',
    multiple: true,
    templateResult: formatMemberOption
})
$('.select2-search__field').css('width', '100%');