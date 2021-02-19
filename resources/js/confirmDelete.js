import { sweetConfirm } from './helpers'

$(".delete-btn").on("click", function(e) {
    e.preventDefault()
    let deleting_item
    console.log(e.target.getAttribute("deleting-item"))
    switch (e.target.getAttribute("deleting-item")) {
        case "workspace":
            deleting_item = "پروژه"
            break;
        
        case "demand":
            deleting_item = "درخواست"
            break;

        default:
            deleting_item = "مورد"
            break;
    }
    sweetConfirm(`آیا از حذف این ${deleting_item} مطمئن هستید؟`, () => {
        $(e.target).parent().submit()
    })
})