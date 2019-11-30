<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/solid.min.css" rel="stylesheet">
    <link rel="stylesheet" href="src/css/all.css">
    <title>dnsmasq – web</title>
</head>
<body>
    <div class="page-wrap">
        <div class="header-container">
            <div class="header-title-content">
                <a class="header-title">masqer</a>
            </div>
        </div>
        <div class="content-container">
            <div class="configuration-container">
                <div class="configuration-header">
                    <div class="configuration-tools">
                        <ul class="configuration-tools--list">
                            <li class="configuration-tools--button"
                                id="tool-add">
                                <i class="fas fa-plus"></i>
                            </li>
                            <li class="configuration-tools--button deactivated"
                                id="tool-remove">
                                <i class="fas fa-minus"></i>
                            </li>
                        </ul>
                    </div>    
                </div>
                <div class="configuration-content">
                    <form id="configuration-form" class="configuration-form">
                        <div class="configuration-form--entry">
                            <input class="entry--select" id="select" type="checkbox" />
                            <input id="ip_address" type="text" placeholder="IP address" />
                            <input id="domain" type="text" placeholder="Domain" />
                        </div>
                        <div class="configuration-form--entry">
                            <input class="entry--select" id="select" type="checkbox" />
                            <input id="ip_address" type="text" placeholder="IP address" />
                            <input id="domain" type="text" placeholder="Domain" />
                        </div>
                        <div class="configuration-form--entry">
                            <input class="entry--select" id="select" type="checkbox" />
                            <input id="ip_address" type="text" placeholder="IP address" />
                            <input id="domain" type="text" placeholder="Domain" />
                        </div>
                        <div class="configuration-form--entry">
                            <input class="entry--select" id="select" type="checkbox" />
                            <input id="ip_address" type="text" placeholder="IP address" />
                            <input id="domain" type="text" placeholder="Domain" />
                        </div>

                    </form>
                    <div class="configuration-actions">
                        <input type="submit" value="Submit">
                    </div>
                </div>
                <div class="is--hidden">
                    <div id="is--template" class="configuration-form--entry">
                        <input class="entry--select" id="select" type="checkbox" />
                        <input id="ip_address" type="text" placeholder="IP address" />
                        <input id="domain" type="text" placeholder="Domain" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="src/js/configuration-tool.js"></script>
</body>
</html>