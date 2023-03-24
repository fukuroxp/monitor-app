<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravue</title>
    <script src="{{ asset('assets/font-awesome/js/all.js') }}"></script>
    <link href="{{ asset('assets/font-awesome/css/all.css') }}" rel="stylesheet">
    @vite('resources/css/app.css')
</head>
<body style="background: #f5f6fa">
<div style="width: 100vw;" id="app"></div>
@vite('resources/js/app.js')
</body>
</html>
