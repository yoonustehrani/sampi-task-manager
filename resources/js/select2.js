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
                <img class="ml-1" src="${img_src}"/>
                ${option.text}
                ${typeof is_user_admin !== "undefined" ? `<span class="badge badge-pill mr-1 ${is_user_admin.nodeValue === "1" ? "badge-success" : "badge-primary"}">${is_user_admin.nodeValue === "1" ? "ادمین" : "کاربر"}</span>` : "" }  
            </div>
        `)
    }
}

export const formatOption = (option) => {
    return $(`
        <div class="select-option">
            ${option.workspace ? `<div class="circle-avatar-pic small-avatar mb-1"><img src="${APP_PATH + option.workspace.avatar_pic}"/><span class="badge badge-light mr-1">${option.workspace.title}</span></div>` : ""}
            ${option.text}${option.group ? ` (${option.group})` : ""}
        </div>
    `)
}

$('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select, #mixed_tasks_order_select, #mixed_tasks_order_by_select, #mixed_tasks_relation_select, #mixed_demands_order_select, #mixed_demands_order_by_select, #mixed_demands_relation_select, #mixed_needs_order_select, #mixed_needs_order_by_select, #mixed_needs_relation_select').select2({
    templateResult: formatOptionWithIcon,
    minimumResultsForSearch: Infinity,
    width: '100%',
    dir: "rtl",
    language: {
        searching: function () {
            return "درحال جستجو ..."
        },
        noResults: function () {
            return "نتیجه ای یافت نشد"
        }
    },
})
$('.select2-search__field').css('width', '100%')

const simpleSearch = (ids, parentOnly) => {
    $(ids).select2({
        templateResult: formatOption,
        templateSelection: function (data, container) {
            $(data.element).attr('workspace_id', data.workspace_id)
            return data.text
        },
        placeholder: 'کار مربوطه را جستجو و انتخاب کنید',
        width: "100%",
        dir: "rtl",
        minimumInputLength: 3,
        delay: 250,
        ajax: {
            url: simple_search_url,
            data: function (params) {
                return {
                    q: params.term,
                    workspace: $("#new-demand-project-select").val(),
                    parentOnly: parentOnly
                }
            },
            processResults: function (res) {
                var data = $.map(res, function (obj) {
                    obj.text = obj.text || obj.title; // replace name with the property used for the text
                    return obj;
                });
                return {
                    results: data
                }
            },
        },
        language: {
            searching: function () {
                return "درحال جستجو ..."
            },
            noResults: function () {
                return "نتیجه ای یافت نشد"
            }
        },
        allowClear: true
    })
}

simpleSearch('#task-select', false)
simpleSearch("#parent-task-select", true)

const renderWithImg = (ids, placeholder, multiple) => {
    $(ids).select2({
        templateResult: formatOptionWithImage,
        placeholder: placeholder,
        width: "100%",
        dir: "rtl",
        multiple: multiple,
        language: {
            searching: function () {
                return "درحال جستجو ..."
            },
            noResults: function () {
                return "نتیجه ای یافت نشد"
            }
        },
        allowClear: true,
    })
}
renderWithImg("#new-demand-member", "نیاز به کمک چه کسی دارید؟", false)
renderWithImg("#new-demand-project-select", "پروژه مربوطه را انتخاب کنید", false)
renderWithImg("#new-task-members", "انجام دهندگان این کار", true)
renderWithImg("#new-task-project-select", "پروژه مربوطه را انتخاب کنید", false)