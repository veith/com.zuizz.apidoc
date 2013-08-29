<?php
/** @var $this ZUFEATURE */
/** @var $REST ZUREST */

$REST = &$this->rest;


$varr = explode(".", $this->identifiers['restlets']);
$feature = $this->identifiers['features'];
$meth = explode('.',$this->values['identifier']);
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



    $this->data['title'] = $doc['title'];
    $this->data['method'] = $doc['method'];
    $this->data['request'] = $doc['request'];
    $this->data['description'] = $doc['description'];






if($REST->expand_requested('mimetypes') && isset($doc['mimetype'])){
    $this->data['mimetypes'] = $doc['mimetype'];
}
if($REST->expand_requested('parameters') && isset($doc['states'])){
    $this->data['states'] = $doc['states'];
}
if($REST->expand_requested('caches') && isset($doc['caches'])){
    $this->data['caches'] = $doc['caches'];
}
if($REST->expand_requested('parameters') && isset($doc['parameter'])){
    $this->data['parameters'] = $doc['parameter'];
}

if($REST->expand_requested('expands') && isset($doc['expands'])){
    $this->data['expands'] = $doc['expands'];
}

if($REST->expand_requested('permissions') && isset($doc['permission'])){
    $this->data['permissions'] = $doc['permission'];
}


$this->data['info']['feature'] = $feature;
$this->data['info']['restlet'] = str_replace('.','/',$this->identifiers['restlets']);
$this->data['info']['method'] = $meth[0];
$this->data['info']['version'] = $version;


$this->data['info']['cdate'] = date('d.m.y H:i:s', $finf[10]);
$this->data['info']['mdate'] = date('d.m.y H:i:s', $finf[9]);
$this->data['info']['accessdate'] = date('d.m.y H:i:s', $finf[8]);



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