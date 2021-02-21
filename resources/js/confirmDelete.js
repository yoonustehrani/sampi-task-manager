import { sweetConfirm, sweetFailDelete } from './helpers'

$(".delete-btn").on("click", function(e) {
    e.preventDefault()
    e.stopPropagation()
    let deleting_item
    switch (e.target.getAttribute("deleting-item")) {
        case "workspace":
            deleting_item = "پروژه"
            break;
        
        case "demand":
            deleting_item = "درخواست"
            break;

        case "user":
            deleting_item = "کاربر"
            break;

        case "permission":
            deleting_item = "مجوز"
            break;

        case "priority":
            deleting_item = "اولویت"
            break;

        case "role":
            deleting_item = "سمت"
            break;

        default:
            sweetFailDelete()
            break;
    }
    if (deleting_item) {
        sweetConfirm(`آیا از حذف این ${deleting_item} مطمئن هستید؟`, () => {
            $(e.target).parent().submit()
        })
    }
})