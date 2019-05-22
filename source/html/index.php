<?php
$site_name = 'Good And Cheap';
$meta_description = 'Web app based on the cookbook by Leanne Brown';

$prod_server = 'goodandcheap.website';

$css = 'goodandcheap.css';
$js = 'goodandcheap.js';

if ($_SERVER['SERVER_NAME'] == $prod_server) {
  $manifest = file_get_contents('build/manifest.json');
  $json = json_decode($manifest, true);
  $css_path = '/build/ui/' . $json[$css];
  $js_path = '/build/ui/' . $json[$js];
} else {
  $css_path = '/ui/css/' . $css;
  $js_path = '/ui/js/' . $js;
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo $site_name?></title>
    <meta name="description" content="<?php echo $meta_description?>">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?t=<?php echo date('U') ?>">
    <link rel="icon" type="image/png" href="/favicon.png?t=<?php echo date('U') ?>">
    <link rel="stylesheet" href="<?php echo $css_path ?>">
  </head>

  <body class="no-touch">
    <div id="app">
      <app></app>

      <noscript>
        <div class="enable-js">
          <p>Please <a href="http://enable-javascript.com" title="How to enable JavaScript in your browser">enable JavaScript</a> to view this website. Thanks!</p>
        </div>
      </noscript>
    </div>

    <script src="<?php echo $js_path ?>"></script>

  <?php if ($_SERVER['SERVER_NAME'] != $prod_server) { ?>
    <div id="css-debugger" src="/ui/js/breakpoints.json" theme="dark"></div>
    <script src="https://css.gauslin.com/js/debugger.js"></script>
  <?php } ?>
  </body>
</html>
