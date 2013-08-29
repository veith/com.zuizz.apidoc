<?php
//fields, expands,mimetype, uri
header("content-type:text/javascript");
$vars = explode('.',$this->identifiers['restlets']);
$restlets = array_slice($vars,0,-1);
$last = array_slice($vars,-1);
$rest_path = "/";
$src = "init_{$last[0]}: function(){\n";
$src .= "  var \$ctx = this.\$ctx,\n  self = this;";

foreach($restlets as $restlet){
$rest_path .= $restlet . "/' + self.rest.id_{$restlet} + '/";
$src .= "  self.rest.id_{$restlet} = 'an1d';\n";
}
$src .= "\n  //bind to ressource {$last[0]}\n";
$rest_path .= "{$last[0]}/";
$resource_uri = "/api/{$version}/{$feature}{$rest_path}";
$src .= "  self.rest.{$last[0]} = new Tc.zu.rest('{$resource_uri}');\n";

$src .= "\n  //define fields\n";
$src .= "  self.rest.{$last[0]}.defineFields('id,field1');\n";

$src .= "\n  //define expands\n";
$src .= "  self.rest.{$last[0]}.defineExpands('expand1(id),expand2(*)');\n";

$src .= "\n  //set mimetype\n";
$src .= "  //mimetype is json per default\n";

$src .="}";
echo $src;