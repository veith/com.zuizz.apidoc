<?php


$varr = explode(".", $this->identifiers['restlets']);
$feature = $this->identifiers['features'];
$meth = explode('.',$this->identifiers['methods']);
if(isset($meth[1])){
    $version = $meth[1];

}else{
    $version =0;
}

$varr[] = "_" . $meth[0];
$view = implode("/", $varr);
$folder = ZU_DIR_FEATURE . implode("/", array($feature, "rest", $view));




if ($version == 0) {
    $file = $folder . "/doc.json";
} else {
    $file = $folder . "/{$version}.doc.json";
}


$finf = stat($file);


$doc = json_decode(file_get_contents($file), true);
$this->data['expands'] = array();
if(isset($doc['expands'])){
    $this->data['expands'] = $doc['expands'];
}

$this->data['info']['feature'] = $feature;
$this->data['info']['restlet'] = str_replace('.','/',$this->identifiers['restlets']);
$this->data['info']['method'] = $meth[0];
$this->data['info']['version'] = $version;



/*
 * Mimetype html
 * Returns:
 * complete list
*/

// set default mimetype
if (!$this->mimetype) {
    $this->mimetype = 'json';
}

switch ($this->mimetype) {

    case "json":
        header('Content-type: application/json');
        $this->contentbuffer = json_encode($this->data);
        break;
}