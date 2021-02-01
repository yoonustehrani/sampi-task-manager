export const formatOptionWithIcon = (option) => {
    if (option.element) {
        let icon_name = option.element.attributes.icon_name.nodeValue
        let containerClass = option.element.attributes.container_class ? option.element.attributes.container_class.nodeValue : null
        return $(`<div class="select-option ${containerClass !== null ? containerClass : ""}"><i class="${icon_name}"></i>${option.text}</div>`)
    }
}
export const formatOptionWithImage = (option) => {
    if (option.element) {
        let img_src = option.element.attributes.img_address.nodeValue, is_user_admin = option.element.attributes.is_admin
        return $(`
            <div class="select-option circle-avatar-pic">
                <img src="${img_src}"/>
                ${option.text}
                ${typeof is_user_admin !== "undefined" ? `<span class="badge badge-pill mr-1 ${is_user_admin === 1 ? "bade-success" : "badge-primary"}">${is_user_admin === 1 ? "ادمین" : "کاربر"}</span>` : "" }  
            </div>
        `)
    }
}

export const formatOption = (option) => {
    if (option.element) {
        return $(`<div class="select-option">${option.text}</div>`)
    }
}

function matchCustom(params, data) {
    // return null
}

$('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select, #mixed_tasks_order_select, #mixed_tasks_order_by_select, #mixed_tasks_relation_select, #mixed_demands_order_select, #mixed_demands_order_by_select, #mixed_demands_relation_select, #mixed_needs_order_select, #mixed_needs_order_by_select, #mixed_needs_relation_select').select2({
    templateResult: formatOptionWithIcon,
    minimumResultsForSearch: Infinity,
    width: '100%',
    dir: "rtl",
})
$('.select2-search__field').css('width', '100%')

$('#task-select').select2({
    templateResult: formatOption,
    placeholder: 'کار مربوطه را جستجو و انتخاب کنید',
    width: "100%",
    dir: "rtl",
    minimumInputLength: 3,
    matcher: matchCustom
})

const renderWithImg = (ids, placeholder, multiple) => {
    $(ids).select2({
        templateResult: formatOptionWithImage,
        placeholder: placeholder,
        width: "100%",
        dir: "rtl",
        multiple: multiple
    })
}
renderWithImg("#new-demand-member", "نیاز به کمک چه کسی دارید؟", false)
renderWithImg("#new-demand-project-select", "پروژه مربوطه را انتخاب کنید", false)
renderWithImg("#new-task-members", "انجام دهندگان این کار", true)
