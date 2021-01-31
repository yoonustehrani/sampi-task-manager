export const setPriority = (id) => {
    switch(parseInt(id)) {
        case 1:
            return 'ضروری و مهم'

        case 2:
            return 'ضروری و غیر مهم'

        case 3:
            return 'غیر ضروری و مهم'

        case 4:
            return 'غیر ضروری و غیر مهم'
            
        default:
            break
    }
}

export const redirectTo = (url) => {
    window.location.href = url
}

export const getUser = (userId) => {
    return USER_ROUTE.replace('userId', userId);
}

export const getTask = (taskId) => {
    return TASK_ROUTE.replace('taskId', taskId);
}

export const getWorkspace = (workspaceId) => {
    return WORKSPACE_ROUTE.replace('workspaceId', workspaceId);
}

export const getDemand = (workspaceId, demandId) => {
    return DEMAND_ROUTE.replace('workspaceId', workspaceId).replace('demandId', demandId)
}

export const sweetError = (errObject) => {
    if (! errObject.response) {
        Swal.default.fire({
            icon: "error",
            title: "خطا",
            html: 'خطا در برقراری ارتباط',
            confirmButtonText: "تایید",
            customClass: {
                content: 'persian-text',
            },
        })
        return;
    }
    let { status, data } = errObject.response
    if (status === 422) {
        let { errors } = data, err_html = ""
        Object.entries(errors).map(([param, message]) => {
            err_html += `<p class="float-right text-center col-12">${message}</p>`
        })
        Swal.default.fire({
            icon: "error",
            title: "خطا",
            html: err_html,
            confirmButtonText: "تایید",
            customClass: {
                content: 'persian-text',
            },
        })
    }
}