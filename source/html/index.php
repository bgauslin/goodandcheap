<?php
$site_name = 'Good And Cheap';
$meta_description = '';

// default paths
$site = 'portfolio';

$css = 'ui/' . $site . '.css';
$js = 'ui/' . $site . '.js';
$css_path = '/' . $css;
$js_path = '/' . $js;

// get TLD for dev vs. production
$host = $_SERVER['HTTP_HOST'];
$parts = explode('.', $host);
$tld = array_pop((array_slice($parts, -1)));

// use manifest and update paths if production
if ($tld == 'website') {
  $file = file_get_contents('./build/rev-manifest.json');
  $json = json_decode($file, true);
  $css_prod = $json[$css];
  $js_prod = $json[$js];
  $css_path = '/build/' . $css_prod;
  $js_path = '/build/' . $js_prod;
}
?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php echo $site_name?></title>
    <meta name="description" content="<?php echo $meta_description?>">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
    <link rel="stylesheet" href="<?php echo $css_path ?>">
  </head>

  <body ontouchstart>
    <div id="app">
      <app></app>

      <noscript>
        <div class="enable-js">
          <p>Please <a href="http://enable-javascript.com" title="How to enable JavaScript in your browser">enable JavaScript</a> to view this website. Thanks!</p>
        </div>
      </noscript>
    </div>

    <script src="<?php echo $js_path ?>"></script>
  </body>
</html>
