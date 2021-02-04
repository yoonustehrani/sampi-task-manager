<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    @auth
        @php
            $url = route('api.task-manager.tasks.search.simple');
            $data = collect([
                ['api_token' => auth()->user()->api_token],
                ['q' => 'hello world'],
                ['workspace' => 1],
                ['parent_only' => 'true']
            ]);
        @endphp
        <div class="col-12 p-3 float-left">
            <p>route : <b>route('api.task-manager.tasks.search.simple')</b></p>
            <p>path : <b>{{ route('api.task-manager.tasks.search.simple') }}</b></p>
            <p>Parameters :</p>
            <table class="table table-bordered">
                <thead>
                    <th>Name</th>
                    <th>Required</th>
                    <th>Description</th>
                    <th>Example</th>
                </thead>
                <tbody>
                    <tr>
                        <th>api_token</th>
                        <td>Yes</td>
                        <td>Api Token of user</td>
                        <td>?api_token={{ auth()->user()->api_token }}</td>
                    </tr>
                    <tr>
                        <th>q</th>
                        <td>Yes</td>
                        <td>Search Query (min:3)</td>
                        <td>?q=hello+world
                            <a target="_blank" href="{{ $url . "?" . http_build_query(array_merge($data[0], $data[1])) }}" class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>workspace</th>
                        <td>No</td>
                        <td>ID of target workspace to filter by</td>
                        <td>?workspace=1
                            <a target="_blank" href="{{ $url . "?" . http_build_query(array_merge($data[0], $data[1], $data[2])) }}" class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>parent_only</th>
                        <td>No</td>
                        <td>ID of target workspace to filter by</td>
                        <td>?parent_only=true
                            <a target="_blank" href="{{ $url . "?" . http_build_query(array_merge($data[0], $data[1], $data[2], $data[3])) }}" class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    @endauth
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/datepicker.js') }}"></script>
</body>
</html>

