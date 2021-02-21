import { sweetConfirm, sweetFailDelete } from './helpers'

function handleDelete (e) {
    e.preventDefault()
    e.stopPropagation()
    let deleting_item = e.target.getAttribute("deleting-item") ? e.target.getAttribute("deleting-item") : $(e.target).parent().attr("deleting-item")
    switch (deleting_item) {
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
            e.target.getAttribute("deleting-item") ? $(e.target).parent().submit() : $(e.target).parent().parent().submit()
        })
    }
}

$(".delete-btn").on("click", (e) => handleDelete(e))
$(".delete-btn").children().on("click", (e) => handleDelete(e))