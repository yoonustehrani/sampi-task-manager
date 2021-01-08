<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="{{ asset('js/app.js') }}"></script>
    <script>
        let list_tasks = "{{ route('api.task-manager.tasks.index', ['workspace' => 1, 'api_token' => auth()->user()->api_token]) }}";
        let add_task = "{{ route('api.task-manager.tasks.store', ['workspace' => 1, 'api_token' => auth()->user()->api_token]) }}";
        // List tasks -> works fine !
        // axios.get(list_tasks).then(res => {
        //     console.log(res.data);
        // })
        // Add a task to the workspace -> works fine !
        // axios.post(add_task, {
        //     title: 'Task number 1',
        //     priority: 1,
        //     group: 'fictional',
        //     // users: [
        //     //     '100',
        //     //     '500'
        //     // ]
        //     // title: '',
        // }).then(res => {
        //     console.log(res.data);
        // }).catch(e => {
        //     let {status, data} = e.response;
        //     if (status === 422) {
        //         let {errors} = data;
        //         // Object.entries(errors).map(([param, message]) => {
        //         //     console.log(message);
        //         // })
        //     }
        // })
    </script>
</body>
</html>